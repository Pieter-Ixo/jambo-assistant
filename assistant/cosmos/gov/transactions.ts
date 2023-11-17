import { cosmos } from '@ixo/impactxclient-sdk';
import * as SDKTxTypes from '@ixo/impactxclient-sdk/types/codegen/cosmos/gov/v1beta1/tx';

import * as Constants from './constants';

export function generateMsgVoteTrx({ proposalId, voter, option }: SDKTxTypes.MsgVote, encode = false) {
  const value = cosmos.gov.v1beta1.MsgVote.fromPartial({
    proposalId,
    voter,
    option,
  });
  return {
    typeUrl: Constants.TRX_TYPES.msgVote,
    value: encode ? cosmos.gov.v1beta1.MsgVote.encode(value).finish() : value,
  };
}

export function generateMsgDepositTrx({ proposalId, depositor, amount }: SDKTxTypes.MsgDeposit, encode = false) {
  const value = cosmos.gov.v1beta1.MsgDeposit.fromPartial({
    proposalId,
    depositor,
    amount: amount.map((a) =>
      cosmos.base.v1beta1.Coin.fromPartial({
        amount: a.amount,
        denom: a.denom,
      }),
    ),
  });
  return {
    typeUrl: Constants.TRX_TYPES.msgDeposit,
    value: encode ? cosmos.gov.v1beta1.MsgDeposit.encode(value).finish() : value,
  };
}
