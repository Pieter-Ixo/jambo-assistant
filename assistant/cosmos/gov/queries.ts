import * as SDKQueryTypes from '@ixo/impactxclient-sdk/types/codegen/cosmos/gov/v1beta1/query';

import { QueryClient } from 'assistant/types/query';

export async function queryProposal(queryClient: QueryClient, { proposalId }: SDKQueryTypes.QueryProposalRequest) {
  const result = await queryClient.cosmos.gov.v1beta1.proposal({
    proposalId,
  });
  return result?.proposal;
}

export async function queryProposals(
  queryClient: QueryClient,
  { proposalStatus, voter, depositor }: SDKQueryTypes.QueryProposalsRequest,
) {
  const result = await queryClient.cosmos.gov.v1beta1.proposals({
    proposalStatus,
    voter,
    depositor,
  });
  return result?.proposals;
}

export async function queryVote(queryClient: QueryClient, { proposalId, voter }: SDKQueryTypes.QueryVoteRequest) {
  const result = await queryClient.cosmos.gov.v1beta1.vote({
    proposalId,
    voter,
  });
  return result?.vote;
}

export async function queryVotes(queryClient: QueryClient, { proposalId }: SDKQueryTypes.QueryVotesRequest) {
  const result = await queryClient.cosmos.gov.v1beta1.votes({
    proposalId,
  });
  return result?.votes;
}

export async function queryParams(queryClient: QueryClient, { paramsType }: SDKQueryTypes.QueryParamsRequest) {
  const result = await queryClient.cosmos.gov.v1beta1.params({ paramsType });
  return paramsType === 'deposit'
    ? result?.depositParams
    : paramsType === 'tally'
    ? result?.depositParams
    : paramsType === 'voting'
    ? result?.votingParams
    : result;
}

export async function queryDeposit(
  queryClient: QueryClient,
  { proposalId, depositor }: SDKQueryTypes.QueryDepositRequest,
) {
  const result = await queryClient.cosmos.gov.v1beta1.deposit({
    proposalId,
    depositor,
  });
  return result?.deposit;
}

export async function queryDeposits(queryClient: QueryClient, { proposalId }: SDKQueryTypes.QueryDepositsRequest) {
  const result = await queryClient.cosmos.gov.v1beta1.deposits({
    proposalId,
  });
  return result?.deposits;
}

export async function queryTallyResult(
  queryClient: QueryClient,
  { proposalId }: SDKQueryTypes.QueryTallyResultRequest,
) {
  const result = await queryClient.cosmos.gov.v1beta1.tallyResult({
    proposalId,
  });
  return result?.tally;
}
