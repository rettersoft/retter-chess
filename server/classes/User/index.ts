import RDK, { Data, InitResponse, Response, StepResponse } from '@retter/rdk'
import { JoinGame } from './rio'

const rdk = new RDK()

export interface UserData<Input = any, Output = any>
    extends Data<Input, Output, { name: string; games: JoinGame[] }, { email: string; password: string }> {}

export async function init(data: UserData): Promise<InitResponse> {
    data.state.public = { name: 'Anonymous Player #' + Math.floor(Math.random() * 100000), games: [] }
    return data
}

export async function getState(data: UserData): Promise<Response> {
    return { statusCode: 200, body: data.context.identity === 'developer' ? data.state : data.state.public }
}

export async function signUp(data: UserData): Promise<StepResponse> {
    if (data.state.private.password) {
        data.response = { statusCode: 406, body: { message: 'You are already signed up.' } }
        return data
    }

    const { name, email, password } = data.request.body
    const exists = await rdk.getLookUpKey({ key: { name: 'email', value: email } })
    if (exists && exists.success && exists.data) {
        data.response = { statusCode: 400, body: { message: 'Email already taken.' } }
        return data
    }

    await rdk.setLookUpKey({ key: { name: 'email', value: email } })
    data.state.public.name = name
    data.state.private = { email, password }
    data.response = { statusCode: 204 }
    return data
}

export async function signIn(data: UserData): Promise<StepResponse> {
    const { password } = data.request.body || {}
    const state = data.state.private
    if (state.password === password)
        data.response = {
            statusCode: 200,
            body: {
                customToken: await generateToken(data.context.instanceId, data.state.private.email),
            },
        }
    else
        data.response = {
            statusCode: 400,
            body: { message: 'Please check your information and try again.' },
        }
    return data
}

export async function joinGame(data: UserData): Promise<StepResponse> {
    if (data.context.identity !== 'Game') {
        data.response = {
            statusCode: 403,
            body: { message: 'You are not authorized to join a game.' },
        }
        return
    }

    const { gameId, side } = data.request.body || {}
    const games = data.state.public.games || []
    const game = Object.assign({ gameId, side }, { createdAt: new Date().toISOString() })
    if (!games.find((game: JoinGame) => game.gameId === gameId)) games.push(game)
    data.state.public.games = games
    data.response = { statusCode: 204 }
    return data
}

export async function leaveGame(data: UserData): Promise<StepResponse> {
    if (data.context.identity !== 'Game') {
        data.response = {
            statusCode: 403,
            body: { message: 'You are not authorized to leave from a game.' },
        }
        return
    }

    const { gameId } = data.request.body || {}
    let games = data.state.public.games || []
    games = games.filter((game: any) => game.gameId !== gameId)
    data.state.public.games = games
    data.response = { statusCode: 204 }
    return data
}

async function generateToken(userId: string, email: string): Promise<string> {
    const tokenResult = await rdk.generateCustomToken({
        identity: 'player',
        userId,
        claims: { email },
    })
    return tokenResult.data.customToken
}
