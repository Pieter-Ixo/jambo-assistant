import { cosmos, utils } from '@ixo/impactxclient-sdk';
import * as SDKTxTypes from '@ixo/impactxclient-sdk/types/codegen/cosmos/feegrant/v1beta1/tx';

import * as Constants from './constants';
import { BasicAllowanceParams } from './types';

export function generateMsgGrantAllowanceTrx(
  { granter, grantee, allowance }: SDKTxTypes.MsgGrantAllowance,
  encode = false,
) {
  const value = cosmos.feegrant.v1beta1.MsgGrantAllowance.fromPartial({
    granter,
    grantee,
    allowance,
  });
  return {
    typeUrl: Constants.TRX_TYPES.msgGrantAllowance,
    value: encode ? cosmos.feegrant.v1beta1.MsgGrantAllowance.encode(value).finish() : value,
  };
}

export function generateBasicAllowance({ spendLimit, expiration }: BasicAllowanceParams, encode = false) {
  const value = cosmos.feegrant.v1beta1.BasicAllowance.fromPartial({
    spendLimit: spendLimit?.denom
      ? [
          cosmos.base.v1beta1.Coin.fromPartial({
            denom: spendLimit.denom,
            amount: spendLimit.amount,
          }),
        ]
      : undefined,
    expiration: expiration ? utils.proto.toTimestamp(new Date(Number(expiration))) : undefined,
  });
  return {
    typeUrl: Constants.ALLOWANCE_TYPES.basicAllowance,
    value: encode ? cosmos.feegrant.v1beta1.BasicAllowance.encode(value).finish() : value,
  };
}

export function generateMsgRevokeAllowanceTrx({ granter, grantee }: SDKTxTypes.MsgRevokeAllowance, encode = false) {
  const value = cosmos.feegrant.v1beta1.MsgRevokeAllowance.fromPartial({
    granter,
    grantee,
  });
  return {
    typeUrl: Constants.TRX_TYPES.msgRevokeAllowance,
    value: encode ? cosmos.feegrant.v1beta1.MsgRevokeAllowance.encode(value).finish() : value,
  };
}
