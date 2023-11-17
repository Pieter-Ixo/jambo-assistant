export type MsgTransferTokenParams = {
  recipient: string;
  tokenName: string;
  amount: string;
};

export type MsgRetireTokenParams = {
  tokenName: string;
  amount: string;
  jurisdiction?: string;
  reason?: string;
};

export type QueryParamsParams = {};

export type QueryTokenListParams = {
  minter?: string;
};

export type QueryTokenDocParams = {
  minter?: string;
  contractAddress: string;
};

export type QueryTokenMetadataParams = {
  id: string;
};

export type GetAccountImpactTokensByAddressParams = {
  address: string;
};

export type GetImpactTokensTotalForEntitiesByAddressParams = {
  address: string;
};

export type GetImpactTokensTotalByAddressParams = {
  address: string;
};

export type TxParams = MsgTransferTokenParams | MsgRetireTokenParams;

export type QueryParams =
  // | QueryParamsParams
  // | QueryTokenListParams
  // | QueryTokenDocParams
  // | QueryTokenMetadataParams
  | GetAccountImpactTokensByAddressParams
  | GetImpactTokensTotalForEntitiesByAddressParams
  | GetImpactTokensTotalByAddressParams;
