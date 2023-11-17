import { gql } from '@apollo/client';

import * as Types from './types';
import * as AssistantTypes from 'assistant/types/assistant';

const GET_ENTITY_BY_ID = gql`
  query getEntityById($id: String!) {
    entity: entity(id: $id) {
      alsoKnownAs
      accounts
      context
      id
      linkedEntity
      linkedResource
      metadata
      owner
      service
      settings
      type
      status
    }
  }
`;
export async function getEntityById(graphqlClient: AssistantTypes.GraphqlClient, { id }: Types.GetEntityByIdParams) {
  const data = await graphqlClient.query({
    query: GET_ENTITY_BY_ID,
    variables: { id },
  });
  return {
    entity: data?.data?.entity as Types.Entity,
  };
}

const GET_ENTITIES_BY_TYPE = gql`
  query getEntitiesByType($type: String!) {
    entities(filter: { type: { equalTo: $type } }) {
      nodes {
        alsoKnownAs
        accounts
        context
        id
        linkedEntity
        linkedResource
        metadata
        owner
        service
        settings
        type
        status
      }
    }
  }
`;
export async function getEntitiesByType(
  graphqlClient: AssistantTypes.GraphqlClient,
  { type }: Types.GetEntitiesByTypeParams,
) {
  const data = await graphqlClient.query({
    query: GET_ENTITIES_BY_TYPE,
    variables: { type },
  });
  return {
    entities: (data?.data?.entities?.nodes ?? []) as Types.Entity[],
  };
}

const GET_ENTITIES_BY_OWNER_ADDRESS = gql`
  query getEntitiesByOwnerAddress($ownerAddress: String!) {
    entities(filter: { owner: { equalTo: $ownerAddress } }) {
      nodes {
        alsoKnownAs
        accounts
        context
        id
        linkedEntity
        linkedResource
        metadata
        owner
        service
        settings
        type
        status
      }
    }
  }
`;
export async function getEntitiesByOwnerAddress(
  graphqlClient: AssistantTypes.GraphqlClient,
  { ownerAddress }: Types.GetEntitiesByOwnerAddressParams,
) {
  const data = await graphqlClient.query({
    query: GET_ENTITIES_BY_OWNER_ADDRESS,
    variables: { ownerAddress },
  });
  return {
    entities: (data?.data?.entities?.nodes ?? []) as Types.Entity[],
  };
}

const GET_ENTITIES_BY_OWNER_ADDRESS_AND_TYPE = gql`
  query getEntitiesByOwnerAddressAndType($ownerAddress: String!, $type: String!) {
    entities(filter: { owner: { equalTo: $ownerAddress }, type: { equalTo: $type } }) {
      nodes {
        alsoKnownAs
        accounts
        context
        id
        linkedEntity
        linkedResource
        metadata
        owner
        service
        settings
        type
        status
      }
    }
  }
`;
export async function getEntitiesByOwnerAddressAndType(
  graphqlClient: AssistantTypes.GraphqlClient,
  { ownerAddress, type }: Types.GetEntitiesByOwnerAddressAndType,
) {
  const data = await graphqlClient.query({
    query: GET_ENTITIES_BY_OWNER_ADDRESS_AND_TYPE,
    variables: { ownerAddress, type },
  });
  return {
    entities: (data?.data?.entities?.nodes ?? []) as Types.Entity[],
  };
}
