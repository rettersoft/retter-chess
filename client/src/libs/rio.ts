/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-namespace */

import Retter from '@retter/sdk';
import { RetterCloudObject } from '@retter/sdk';
import { RetterCloudObjectCall } from '@retter/sdk';
import { RetterCloudObjectConfig } from '@retter/sdk';

export interface RioModelsObject {
  CreateGame?: CreateGame;
  JoinGame?: JoinGame;
  LeaveGame?: LeaveGame;
  Play?: Play;
  SignIn?: SignIn;
  SignUp?: SignUp;
}

export interface CreateGame {
  side?: Side;
}

/**
 * Black or white.
 */
export enum Side {
  Black = 'black',
  White = 'white',
}

export interface JoinGame {
  /**
   * Game's id.
   */
  gameId: string;
  /**
   * Black or white.
   */
  side: Side;
}

export interface LeaveGame {
  /**
   * Game's id.
   */
  gameId: string;
}

export interface Play {
  /**
   * Piece from.
   */
  from: string;
  /**
   * Piece to.
   */
  to: string;
}

export interface SignIn {
  /**
   * Player's password.
   */
  password: string;
}

export interface SignUp {
  /**
   * Player's email.
   */
  email: string;
  /**
   * Player's name.
   */
  name: string;
  /**
   * Player's password.
   */
  password: string;
}

export namespace RioClasses {
  export class User {
    public readonly _obj: RetterCloudObject;

    private constructor(obj: RetterCloudObject) {
      this._obj = obj;
    }

    static async getInstance(
      rio: Retter,
      options?: RetterCloudObjectConfig
    ): Promise<User> {
      return new User(
        await rio.getCloudObject({ ...options, classId: 'User' })
      );
    }

    async signUp(
      input?: SignUp,
      options?: RetterCloudObjectCall
    ): Promise<any> {
      return this._obj
        .call({ ...options, method: 'signUp', body: input })
        .then((r: { data: any }) => r.data);
    }

    async signIn(
      input?: SignIn,
      options?: RetterCloudObjectCall
    ): Promise<any> {
      return this._obj
        .call({ ...options, method: 'signIn', body: input })
        .then((r: { data: any }) => r.data);
    }

    async joinGame(
      input?: JoinGame,
      options?: RetterCloudObjectCall
    ): Promise<any> {
      return this._obj
        .call({ ...options, method: 'joinGame', body: input })
        .then((r: { data: any }) => r.data);
    }

    async leaveGame(
      input?: LeaveGame,
      options?: RetterCloudObjectCall
    ): Promise<any> {
      return this._obj
        .call({ ...options, method: 'leaveGame', body: input })
        .then((r: { data: any }) => r.data);
    }
  }

  export class Game {
    public readonly _obj: RetterCloudObject;

    private constructor(obj: RetterCloudObject) {
      this._obj = obj;
    }

    static async getInstance(
      rio: Retter,
      options?: RetterCloudObjectConfig
    ): Promise<Game> {
      return new Game(
        await rio.getCloudObject({ ...options, classId: 'Game' })
      );
    }

    async join(input?: any, options?: RetterCloudObjectCall): Promise<any> {
      return this._obj
        .call({ ...options, method: 'join', body: input })
        .then((r: { data: any }) => r.data);
    }

    async play(input?: Play, options?: RetterCloudObjectCall): Promise<any> {
      return this._obj
        .call({ ...options, method: 'play', body: input })
        .then((r: { data: any }) => r.data);
    }

    async leave(input?: any, options?: RetterCloudObjectCall): Promise<any> {
      return this._obj
        .call({ ...options, method: 'leave', body: input })
        .then((r: { data: any }) => r.data);
    }
  }
}
