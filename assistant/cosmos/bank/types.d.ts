import { Output } from '@ixo/impactxclient-sdk/types/codegen/cosmos/bank/v1beta1/bank';
import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin';

export type MsgSendParams = {
  toAddress: string;
  amount: Coin[];
};

export type MsgMultiSendParams = {
  outputs: Output[];
};

export type QueryBalanceParams = {
  address?: string;
  denom: string;
};

export type QueryAllBalancesParams = {
  address?: string;
};

export type TxParams = MsgSendParams | MsgMultiSendParams;

export type QueryParams = QueryBalanceParams | QueryAllBalancesParams;
