import {
  MsgGrantEntityAccountAuthz,
  MsgTransferEntity,
} from '@ixo/impactxclient-sdk/types/codegen/ixo/entity/v1beta1/tx';
import { ixo } from '@ixo/impactxclient-sdk';

import * as Constants from './constants';

export function generateMsgTransferEntityTrx(
  { id, ownerDid, ownerAddress, recipientDid }: MsgTransferEntity,
  encode = false,
) {
  const value = ixo.entity.v1beta1.MsgTransferEntity.fromPartial({
    id,
    ownerDid,
    ownerAddress,
    recipientDid,
  });
  return {
    typeUrl: Constants.TRX_TYPES.msgTransferEntity,
    value: encode ? ixo.entity.v1beta1.MsgTransferEntity.encode(value).finish() : value,
  };
}

export function generateMsgGrantEntityAccountAuthz(
  { id, name, granteeAddress, grant, ownerAddress }: MsgGrantEntityAccountAuthz,
  encode = false,
) {
  const value = ixo.entity.v1beta1.MsgGrantEntityAccountAuthz.fromPartial({
    id,
    name,
    granteeAddress,
    grant,
    ownerAddress,
  });
  return {
    typeUrl: Constants.TRX_TYPES.msgGrantEntityAccountAuthz,
    value: encode ? ixo.entity.v1beta1.MsgGrantEntityAccountAuthz.encode(value).finish() : value,
  };
}
