import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin';
import { Height } from '@ixo/impactxclient-sdk/types/codegen/ibc/core/client/v1/client';

export type MsgTransferParams = {
  sourcePort: string;
  sourceChannel: string;
  token?: Coin;
  /** the sender address */
  sender?: string;
  receiver: string;
  timeoutHeight?: Height;
  timeoutTimestamp: Long;
  memo?: string;
};

export type QueryDenomTraceParams = {
  hash: string;
};

export type QueryDenomTracesParams = {};

export type QueryParamsParams = {};

export type QueryDenomHashParams = {
  trace: string;
};

export type QueryEscrowAddressParams = {
  portId: string;
  channelId: string;
};

export type QueryChannelParams = {
  portId: string;
  channelId: string;
};

export type QueryChannelsParams = {};

export type TxParams = MsgTransferParams;

export type QueryParams =
  | QueryDenomTraceParams
  | QueryDenomTracesParams
  | QueryParamsParams
  | QueryDenomHashParams
  | QueryEscrowAddressParams
  | QueryChannelParams
  | QueryChannelsParams;
