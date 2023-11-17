import { cosmos } from '@ixo/impactxclient-sdk';
import * as SDKTxTypes from '@ixo/impactxclient-sdk/types/codegen/cosmos/bank/v1beta1/tx';

import * as Constants from './constants';

export function generateMsgSendTrx({ fromAddress, toAddress, amount }: SDKTxTypes.MsgSend, encode = false) {
  const value = cosmos.bank.v1beta1.MsgSend.fromPartial({
    fromAddress,
    toAddress,
    amount,
  });
  return {
    typeUrl: Constants.TRX_TYPES.msgSend,
    value: encode ? cosmos.bank.v1beta1.MsgSend.encode(value).finish() : value,
  };
}

export function generateMsgMultiSendTrx({ inputs, outputs }: SDKTxTypes.MsgMultiSend, encode = false) {
  const value = cosmos.bank.v1beta1.MsgMultiSend.fromPartial({
    inputs,
    outputs,
  });
  return {
    typeUrl: Constants.TRX_TYPES.msgMultiSend,
    value: encode ? cosmos.bank.v1beta1.MsgMultiSend.encode(value).finish() : value,
  };
}
