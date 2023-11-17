import * as SDKTxTypes from '@ixo/impactxclient-sdk/types/codegen/ixo/token/v1beta1/tx';
import { ixo } from '@ixo/impactxclient-sdk';

import * as Constants from './constants';

export function generateMsgTransferTokenTrx({ owner, recipient, tokens }: SDKTxTypes.MsgTransferToken, encode = false) {
  const value = ixo.token.v1beta1.MsgTransferToken.fromPartial({
    owner,
    recipient,
    tokens,
  });
  return {
    typeUrl: Constants.TRX_TYPES.msgTransferToken,
    value: encode ? ixo.token.v1beta1.MsgTransferToken.encode(value).finish() : value,
  };
}

export function generateMsgRetireTokenTrx(
  { owner, tokens, jurisdiction, reason }: SDKTxTypes.MsgRetireToken,
  encode = false,
) {
  const value = ixo.token.v1beta1.MsgRetireToken.fromPartial({
    owner,
    tokens,
    jurisdiction,
    reason,
  });
  return {
    typeUrl: Constants.TRX_TYPES.msgRetireToken,
    value: encode ? ixo.token.v1beta1.MsgRetireToken.encode(value).finish() : value,
  };
}
