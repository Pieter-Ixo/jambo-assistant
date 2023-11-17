import { cosmos } from '@ixo/impactxclient-sdk';
import * as SDKTxTypes from '@ixo/impactxclient-sdk/types/codegen/cosmos/distribution/v1beta1/tx';

import * as Constants from './constants';

export function generateMsgSetWithdrawAddressTrx(
  { delegatorAddress, withdrawAddress }: SDKTxTypes.MsgSetWithdrawAddress,
  encode = false,
) {
  const value = cosmos.distribution.v1beta1.MsgSetWithdrawAddress.fromPartial({
    delegatorAddress,
    withdrawAddress,
  });
  return {
    typeUrl: Constants.TRX_TYPES.msgSetWithdrawAddress,
    value: encode ? cosmos.distribution.v1beta1.MsgSetWithdrawAddress.encode(value).finish() : value,
  };
}

export function generateMsgWithdrawDelegatorRewardTrx(
  { delegatorAddress, validatorAddress }: SDKTxTypes.MsgWithdrawDelegatorReward,
  encode = false,
) {
  const value = cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward.fromPartial({
    delegatorAddress,
    validatorAddress,
  });
  return {
    typeUrl: Constants.TRX_TYPES.msgWithdrawDelegatorReward,
    value: encode ? cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward.encode(value).finish() : value,
  };
}
