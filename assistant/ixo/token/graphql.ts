import { gql } from '@apollo/client';

import * as Types from './types';
import * as AssistantTypes from 'assistant/types/assistant';

const GET_ACCOUNT_IMPACT_TOKENS_BY_ADDRESS = gql`
  query GetAccountImpactTokens($address: String!) {
    getAccountTokens(address: $address)
  }
`;

export async function getAccountImpactTokensByAddress(
  graphqlClient: AssistantTypes.GraphqlClient,
  { address }: Types.GetAccountImpactTokensByAddressParams,
) {
  const data = await graphqlClient.query({
    query: GET_ACCOUNT_IMPACT_TOKENS_BY_ADDRESS,
    variables: { address },
  });

  return data?.data?.getAccountTokens ?? [];
}

const GET_IMPACT_TOKENS_TOTAL_FOR_ENTITIES_BY_ADDRESS = gql`
  query GetImpactTokensTotalForEntities($address: String!) {
    getTokensTotalForEntities(address: $address)
  }
`;

export async function getImpactTokensTotalForEntitiesByAddress(
  graphqlClient: AssistantTypes.GraphqlClient,
  { address }: Types.GetImpactTokensTotalForEntitiesByAddressParams,
) {
  const data = await graphqlClient.query({
    query: GET_IMPACT_TOKENS_TOTAL_FOR_ENTITIES_BY_ADDRESS,
    variables: { address },
  });

  return data?.data?.getTokensTotalForEntities ?? [];
}

const GET_IMPACT_TOKENS_TOTAL_BY_ADDRESS = gql`
  query GetImpactTokensTotalByAddress($address: String!) {
    getTokensTotalByAddress(address: $address)
  }
`;

export async function getImpactTokensTotalByAddress(
  graphqlClient: AssistantTypes.GraphqlClient,
  { address }: Types.GetImpactTokensTotalByAddressParams,
) {
  const data = await graphqlClient.query({
    query: GET_IMPACT_TOKENS_TOTAL_BY_ADDRESS,
    variables: { address },
  });

  return data?.data?.getTokensTotalByAddress ?? [];
}
