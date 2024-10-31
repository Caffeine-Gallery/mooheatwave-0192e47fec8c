import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface FarmLocation { 'latitude' : number, 'longitude' : number }
export interface _SERVICE {
  'getDairyFarms' : ActorMethod<[], Array<FarmLocation>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
