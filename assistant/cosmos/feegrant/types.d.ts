export type MsgGrantAllowanceParams = {
  grantee: string;
  allowance: {
    allowanceType: 'BasicAllowance';
    expiration: string;
    spendLimit: {
      denom: string;
      amount: string;
    };
  };
};

export type MsgRevokeAllowanceParams = {
  grantee: string;
};

export type QueryAllowanceParams = {
  granter: string;
  grantee: string;
};

export type QueryAllowancesParams = {
  grantee?: string;
};

export type QueryAllowancesByGranterParams = {
  granter?: string;
};

export type TxParams = MsgGrantAllowanceParams | MsgRevokeAllowanceParams;

export type QueryParams = QueryAllowanceParams | QueryAllowancesParams | QueryAllowancesByGranterParams;

export type BasicAllowanceParams = {
  spendLimit?: {
    denom: string;
    amount: string;
  };
  expiration?: string;
};
