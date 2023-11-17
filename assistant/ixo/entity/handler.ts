import * as SDKTxTypes from '@ixo/impactxclient-sdk/types/codegen/ixo/entity/v1beta1/tx';
import * as SDKQueryTypes from '@ixo/impactxclient-sdk/types/codegen/ixo/entity/v1beta1/query';
import { cosmos } from '@ixo/impactxclient-sdk';

import * as Types from './types';
import * as Queries from './queries';
import * as Graphql from './graphql';
import * as Constants from './constants';
import * as Transactions from './transactions';

import * as AssistantTypes from 'assistant/types/assistant';

export async function transactions(
  name: string,
  params: Types.TxParams,
  user: AssistantTypes.User,
  {}: AssistantTypes.Clients,
) {
  switch (name) {
    case Constants.TX.msgTransferEntity:
      const msgTransferEntity = Transactions.generateMsgTransferEntityTrx({
        id: (params as Types.MsgTransferEntityParams).id,
        ownerDid: user.did ?? '',
        ownerAddress: user.address ?? '',
        recipientDid: (params as Types.MsgTransferEntityParams).recipientDid,
      } as SDKTxTypes.MsgTransferEntity);
      return msgTransferEntity;
    case Constants.TX.msgGrantEntityAccountAuthz:
      const msgGrantEntityAccountAuthz = Transactions.generateMsgGrantEntityAccountAuthz({
        id: (params as Types.MsgGrantEntityAccountAuthzParams).id,
        name: 'admin',
        granteeAddress: (params as Types.MsgGrantEntityAccountAuthzParams).granteeAddress,
        grant: cosmos.authz.v1beta1.Grant.fromPartial({
          // authorization: generateGenericAuthorizationTrx({
          // }) // TODO: add authorization
        }),
        ownerAddress: user.address ?? '',
      } as SDKTxTypes.MsgGrantEntityAccountAuthz);
      return msgGrantEntityAccountAuthz;
    default:
      throw new Error('Unknown transaction');
  }
}

export async function queries(
  name: string,
  params: Types.QueryParams,
  user: AssistantTypes.User,
  { queryClient, graphqlClient }: AssistantTypes.Clients,
) {
  switch (name) {
    // case Constants.QUERY.queryParams:
    //   const queryParams = Queries.queryParams(
    //     queryClient as AssistantTypes.QueryClient,
    //     {} as SDKQueryTypes.QueryParamsRequest,
    //   );
    //   return JSON.stringify(queryParams);
    // case Constants.QUERY.queryEntity:
    //   const queryEntity = Queries.queryEntity(
    //     queryClient as AssistantTypes.QueryClient,
    //     {
    //       id: (params as Types.QueryEntityParams).id,
    //     } as SDKQueryTypes.QueryEntityRequest,
    //   );
    //   return JSON.stringify(queryEntity);
    // case Constants.QUERY.queryEntityMetadata:
    //   const queryEntityMetadata = Queries.queryEntityMetadata(
    //     queryClient as AssistantTypes.QueryClient,
    //     {
    //       id: (params as Types.QueryEntityMetadataParams).id,
    //     } as SDKQueryTypes.QueryEntityMetadataRequest,
    //   );
    //   return JSON.stringify(queryEntityMetadata);
    // case Constants.QUERY.queryEntityIidDocument:
    //   const queryEntityIidDocument = Queries.queryEntityIidDocument(
    //     queryClient as AssistantTypes.QueryClient,
    //     {
    //       id: (params as Types.QueryEntityIidDocumentParams).id,
    //     } as SDKQueryTypes.QueryEntityIidDocumentRequest,
    //   );
    //   return JSON.stringify(queryEntityIidDocument);
    // case Constants.QUERY.queryEntityVerified:
    //   const queryEntityVerified = Queries.queryEntityVerified(
    //     queryClient as AssistantTypes.QueryClient,
    //     {
    //       id: (params as Types.QueryEntityVerifiedParams).id,
    //     } as SDKQueryTypes.QueryEntityVerifiedRequest,
    //   );
    //   return JSON.stringify(queryEntityVerified);
    // case Constants.QUERY.queryEntityList:
    //   const queryEntityList = Queries.queryEntityList(
    //     queryClient as AssistantTypes.QueryClient,
    //     {} as SDKQueryTypes.QueryEntityListRequest,
    //   );
    //   return JSON.stringify(queryEntityList);
    case Constants.QUERY.getEntityById:
      const getEntityById = Graphql.getEntityById(
        graphqlClient as AssistantTypes.GraphqlClient,
        {
          id: (params as Types.GetEntityByIdParams).id,
        } as Types.GetEntityByIdParams,
      );
      return JSON.stringify(getEntityById);
    case Constants.QUERY.getEntitiesByType:
      const getEntitiesByType = Graphql.getEntitiesByType(
        graphqlClient as AssistantTypes.GraphqlClient,
        {
          type: (params as Types.GetEntitiesByTypeParams).type,
        } as Types.GetEntitiesByTypeParams,
      );
      return JSON.stringify(getEntitiesByType);
    case Constants.QUERY.getEntitiesByOwnerAddress:
      const getEntitiesByOwnerAddress = Graphql.getEntitiesByOwnerAddress(
        graphqlClient as AssistantTypes.GraphqlClient,
        {
          ownerAddress: (params as Types.GetEntitiesByOwnerAddressParams).ownerAddress,
        } as Types.GetEntitiesByOwnerAddressParams,
      );
      return JSON.stringify(getEntitiesByOwnerAddress);
    case Constants.QUERY.getEntitiesByOwnerAddressAndType:
      const getEntitiesByOwnerAddressAndType = Graphql.getEntitiesByOwnerAddressAndType(
        graphqlClient as AssistantTypes.GraphqlClient,
        {
          ownerAddress: (params as Types.GetEntitiesByOwnerAddressAndType).ownerAddress,
          type: (params as Types.GetEntitiesByOwnerAddressAndType).type,
        } as Types.GetEntitiesByOwnerAddressAndType,
      );
      return JSON.stringify(getEntitiesByOwnerAddressAndType);
    default:
      throw new Error('Unknown query');
  }
}
