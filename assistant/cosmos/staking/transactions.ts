import * as SDKTxTypes from '@ixo/impactxclient-sdk/types/codegen/cosmos/staking/v1beta1/tx';
import { cosmos } from '@ixo/impactxclient-sdk';

import * as Constants from './constants';

export function generateMsgDelegateTrx(
  { delegatorAddress, validatorAddress, amount }: SDKTxTypes.MsgDelegate,
  encode = false,
) {
  const value = cosmos.staking.v1beta1.MsgDelegate.fromPartial({
    delegatorAddress,
    validatorAddress,
    amount: cosmos.base.v1beta1.Coin.fromPartial({ amount: amount?.amount, denom: amount?.denom }),
  });
  return {
    typeUrl: Constants.TRX_TYPES.msgDelegate,
    value: encode ? cosmos.staking.v1beta1.MsgDelegate.encode(value).finish() : value,
  };
}

export function generateMsgBeginRedelegateTrx(
  { delegatorAddress, validatorSrcAddress, validatorDstAddress, amount }: SDKTxTypes.MsgBeginRedelegate,
  encode = false,
) {
  const value = cosmos.staking.v1beta1.MsgBeginRedelegate.fromPartial({
    delegatorAddress,
    validatorSrcAddress,
    validatorDstAddress,
    amount: cosmos.base.v1beta1.Coin.fromPartial({ amount: amount?.amount, denom: amount?.denom }),
  });
  return {
    typeUrl: Constants.TRX_TYPES.msgBeginRedelegate,
    value: encode ? cosmos.staking.v1beta1.MsgBeginRedelegate.encode(value).finish() : value,
  };
}

export function generateMsgUndelegateTrx(
  { delegatorAddress, validatorAddress, amount }: SDKTxTypes.MsgUndelegate,
  encode = false,
) {
  const value = cosmos.staking.v1beta1.MsgUndelegate.fromPartial({
    delegatorAddress,
    validatorAddress,
    amount: cosmos.base.v1beta1.Coin.fromPartial({ amount: amount?.amount, denom: amount?.denom }),
  });
  return {
    typeUrl: Constants.TRX_TYPES.msgUndelegate,
    value: encode ? cosmos.staking.v1beta1.MsgUndelegate.encode(value).finish() : value,
  };
}
