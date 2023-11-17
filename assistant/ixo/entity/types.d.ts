export type MsgTransferEntityParams = {
  id: string;
  recipientDid: string;
};

export type MsgGrantEntityAccountAuthzParams = {
  id: string;
  granteeAddress: string;
  expiration: string;
};

export type QueryParamsParams = {};

export type QueryEntityParams = {
  id: string;
};

export type QueryEntityMetadataParams = {
  id: string;
};

export type QueryEntityIidDocumentParams = {
  id: string;
};

export type QueryEntityVerifiedParams = {
  id: string;
};

export type QueryEntityListParams = {};

export type GetEntityByIdParams = {
  id: string;
};

export type GetEntitiesByTypeParams = {
  type: string;
};

export type GetEntitiesByOwnerAddressParams = {
  ownerAddress: string;
};

export type GetEntitiesByOwnerAddressAndType = {
  ownerAddress: string;
  type: string;
};

export type TxParams = MsgTransferEntityParams | MsgGrantEntityAccountAuthzParams;

export type QueryParams =
  | QueryParamsParams
  | QueryEntityParams
  | QueryEntityMetadataParams
  | QueryEntityIidDocumentParams
  | QueryEntityVerifiedParams
  | QueryEntityListParams
  | GetEntityByIdParams
  | GetEntitiesByTypeParams
  | GetEntitiesByOwnerAddressParams
  | GetEntitiesByOwnerAddressAndType;

export type EntityContext = {
  key?: string;
  val?: string;
};

export type EntityMetaData = {
  versionId?: string;
  created?: string;
  updated?: string;
  deactivated?: boolean;
};

export type EntityVerificationMethod = {
  id?: string;
  type?: string;
  controller?: string;
  blockchainAccountId?: string;
  publicKeyHex?: string;
  publicKeyMultibase?: string;
  publicKeyBase58?: string;
};

export type EntityService = {
  id?: string;
  type?: string;
  serviceEndpoint?: string;
};

export type EntityAccordedRight = {
  id?: string;
  type?: string;
  mechanism?: string;
  message?: string;
  service?: string;
};

export type EntityLinkedResource = {
  id?: string;
  type?: string;
  description?: string;
  mediaType?: string;
  serviceEndpoint?: string;
  proof?: string;
  encrypted?: string;
  right?: string;
};

export type EntityLinkedEntity = {
  id?: string;
  type?: string;
  relationship?: string;
  service?: string;
};

export type EntityAccount = {
  name?: string;
  address?: string;
};

export type Entity = {
  accordedRight?: EntityAccordedRight[]; // not used
  accounts?: EntityAccount[];
  alsoKnownAs?: string;
  assertionMethod?: string[]; // not used
  authentication?: string[]; // not used
  capabilityDelegation?: string[]; // not used
  capabilityInvocation?: string[]; // not used
  context?: (EntityContext | string)[];
  controller?: string[]; // not used
  credentials?: string[]; // not used
  dao?: string;
  daoProfile?: string;
  endDate?: string; // not used
  entityVerified?: boolean; // not used
  id: string;
  keyAgreement?: string[]; // not used
  linkedEntity?: EntityLinkedEntity[];
  linkedResource?: EntityLinkedResource[];
  metadata?: EntityMetaData;
  page?: string;
  profile?: string;
  relayerNode?: string; // not used
  owner?: string;
  service?: EntityService[];
  settings?: any;
  startDate?: string; // not used
  status?: number;
  tags?: string;
  token?: string;
  type?: string;
  verificationMethod?: EntityVerificationMethod[]; // not used
  zlottie?: string;
};

export type EntityState = {
  loading: boolean;
  error: string | null;
  data: Entity[];
  devicesCount: number;
};
