import { Grant } from '@ixo/impactxclient-sdk/types/codegen/cosmos/authz/v1beta1/authz';

export type MsgGrantParams = {
  granter?: string;
  grantee: string;
  grant?: Grant;
};

export type MsgExecParams = {
  grantee: string;
  msgs: any[];
};

export type MsgRevokeParams = {
  granter?: string;
  grantee: string;
  msgTypeUrl?: string;
};

export type QueryGrantsParams = {
  granter?: string;
  grantee?: string;
  msgTypeUrl?: string;
};

export type QueryGranterGrantsParams = {
  granter?: string;
};

export type QueryGranteeGrantsParams = {
  grantee?: string;
};

export type TxParams = MsgGrantParams | MsgExecParams | MsgRevokeParams;

export type QueryParams = QueryGrantsParams | QueryGranterGrantsParams | QueryGranteeGrantsParams;
