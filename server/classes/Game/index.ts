import * as chess from 'js-chess-engine'
import { Data, InitResponse, Response, StepResponse } from '@retter/rdk'
import { Classes, Side } from './rio'

export interface GameData<Input = any, Output = any> extends Data<Input, Output, { black?: string; white?: string; board: any }> {}

const identities = ['player', 'spectator', 'developer']
export async function preAuthorizer(data: GameData): Promise<Response> {
    if (identities.includes(data.context.identity)) return { statusCode: 204 }
    else return { statusCode: 400, body: { message: 'You must be a player or spectator.' } }
}

export async function init(data: GameData): Promise<InitResponse> {
    const { userId } = data.context
    const { side } = data.request.body || {}
    const game = new chess.Game()
    data.state.public[side] = userId
    data.state.public.board = game.exportJson()

    // * add this game to user's games
    const user = new Classes.User(userId)
    await user.joinGame({ gameId: data.context.instanceId, side })
    return data
}

export async function getState(data: GameData): Promise<Response> {
    return { statusCode: 200, body: data.context.identity === 'projectUser' ? data.state : data.state.public }
}

export async function join(data: GameData): Promise<StepResponse> {
    const { userId } = data.context
    const { white, black } = data.state.public
    if (white && black) data.response = { statusCode: 403, body: { message: 'You cannot join this game.' } }
    else {
        if (white) data.state.public.black = userId
        else data.state.public.white = userId

        // * add this game to user's games
        const user = new Classes.User(userId)
        await user.joinGame({ gameId: data.context.instanceId, side: white ? Side.Black : Side.White })
    }
    return data
}

export async function play(data: GameData): Promise<StepResponse> {
    const { userId } = data.context
    const { from, to } = data.request.body || {}
    const state = data.state.public
    const { black, white } = state
    const turn = state.board.turn
    if (black !== userId && white !== userId) data.response = { statusCode: 400, body: { message: 'You are not in this game.' } }
    else if (state[turn] !== userId) data.response = { statusCode: 400, body: { message: 'It is not your turn.' } }
    else {
        const board = chess.move(data.state.public.board, from, to)
        data.state.public.board = board
        data.response = { statusCode: 204 }
    }
    return data
}

export async function leave(data: GameData): Promise<StepResponse> {
    const { userId } = data.context
    const state = data.state.public
    const { black, white } = state
    if (black !== userId && white !== userId) data.response = { statusCode: 400, body: { message: 'You are not in this game.' } }
    else if (black === userId) data.state.public.black = undefined
    else data.state.public.white = undefined

    // * remove this game from user's games
    const user = new Classes.User(userId)
    await user.leaveGame({ gameId: data.context.instanceId })

    data.response = { statusCode: 204 }
    return data
}
