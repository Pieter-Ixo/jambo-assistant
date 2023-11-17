import * as SDKTxTypes from '@ixo/impactxclient-sdk/types/codegen/cosmos/authz/v1beta1/tx';
import { cosmos } from '@ixo/impactxclient-sdk';

import * as Constants from './constants';

export function generateMsgGrantTrx({ granter, grantee, grant }: SDKTxTypes.MsgGrant, encode = false) {
  const value = cosmos.authz.v1beta1.MsgGrant.fromPartial({
    granter,
    grantee,
    grant,
  });
  return {
    typeUrl: Constants.TRX_TYPES.msgGrant,
    value: encode ? cosmos.authz.v1beta1.MsgGrant.encode(value).finish() : value,
  };
}

export function generateMsgExecTrx({ grantee, msgs }: SDKTxTypes.MsgExec, encode = false) {
  const value = cosmos.authz.v1beta1.MsgExec.fromPartial({
    grantee,
    msgs,
  });
  return {
    typeUrl: Constants.TRX_TYPES.msgExec,
    value: encode ? cosmos.authz.v1beta1.MsgExec.encode(value).finish() : value,
  };
}

export function generateMsgRevokeTrx({ granter, grantee, msgTypeUrl }: SDKTxTypes.MsgRevoke, encode = false) {
  const value = cosmos.authz.v1beta1.MsgRevoke.fromPartial({
    granter,
    grantee,
    msgTypeUrl,
  });
  return {
    typeUrl: Constants.TRX_TYPES.msgRevoke,
    value: encode ? cosmos.authz.v1beta1.MsgRevoke.encode(value).finish() : value,
  };
}
