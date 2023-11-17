import { ibc } from '@ixo/impactxclient-sdk';
import * as SDKTxTypes from '@ixo/impactxclient-sdk/types/codegen/ibc/applications/transfer/v1/tx';

import * as Constants from './constants';

export function generateMsgTransferTrx(
  { sourcePort, sourceChannel, token, sender, receiver, timeoutHeight, timeoutTimestamp, memo }: SDKTxTypes.MsgTransfer,
  encode = false,
) {
  const value = ibc.applications.transfer.v1.MsgTransfer.fromPartial({
    sourcePort,
    sourceChannel,
    token,
    sender,
    receiver,
    timeoutHeight,
    timeoutTimestamp,
    memo,
  });
  return {
    type: Constants.TRX_TYPES.msgTransfer,
    value: encode ? ibc.applications.transfer.v1.MsgTransfer.encode(value).finish() : value,
  };
}
