import { longify } from '@cosmjs/stargate/build/queryclient';
import * as SDKTxTypes from '@ixo/impactxclient-sdk/types/codegen/cosmos/gov/v1beta1/tx';
import * as SDKQueryTypes from '@ixo/impactxclient-sdk/types/codegen/cosmos/gov/v1beta1/query';

import * as Types from './types';
import * as Queries from './queries';
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
    case Constants.TX.msgVote:
      const msgVote = Transactions.generateMsgVoteTrx({
        proposalId: longify((params as Types.MsgVoteParams).proposalId ?? 0),
        voter: user?.address ?? '',
        option: (params as Types.MsgVoteParams).option as any,
        metadata: (params as Types.MsgVoteParams).metadata,
      } as SDKTxTypes.MsgVote);
      return msgVote;
    case Constants.TX.msgDeposit:
      const msgDeposit = Transactions.generateMsgDepositTrx({
        proposalId: longify((params as Types.MsgDepositParams).proposalId ?? 0),
        depositor: user?.address ?? '',
        amount: (params as Types.MsgDepositParams).amount,
      } as SDKTxTypes.MsgDeposit);
      return msgDeposit;
    default:
      throw new Error('Unknown transaction');
  }
}
export async function queries(
  name: string,
  params: Types.QueryParams,
  user: AssistantTypes.User,
  { queryClient }: AssistantTypes.Clients,
) {
  switch (name) {
    case Constants.QUERY.queryProposal:
      const queryProposal = await Queries.queryProposal(
        queryClient as AssistantTypes.QueryClient,
        {
          proposalId: longify((params as Types.MsgVoteParams).proposalId ?? 0),
        } as SDKQueryTypes.QueryProposalRequest,
      );
      return JSON.stringify(queryProposal);
    case Constants.QUERY.queryProposals:
      const queryProposals = await Queries.queryProposals(
        queryClient as AssistantTypes.QueryClient,
        {
          proposalStatus: (params as Types.QueryProposalsParams).proposalStatus ?? '',
          voter: (params as Types.QueryProposalsParams).voter ?? '',
          depositor: (params as Types.QueryProposalsParams).depositor ?? '',
        } as SDKQueryTypes.QueryProposalsRequest,
      );
      return JSON.stringify(queryProposals.filter((p, i) => i < ((params as Types.QueryProposalsParams)?.limit ?? 10)));
    case Constants.QUERY.queryVote:
      const queryVote = await Queries.queryVote(
        queryClient as AssistantTypes.QueryClient,
        {
          proposalId: longify((params as Types.MsgVoteParams).proposalId ?? 0),
        } as SDKQueryTypes.QueryVoteRequest,
      );
      return JSON.stringify(queryVote);
    case Constants.QUERY.queryVotes:
      const queryVotes = await Queries.queryVotes(
        queryClient as AssistantTypes.QueryClient,
        {
          proposalId: longify((params as Types.MsgVoteParams).proposalId ?? 0),
        } as SDKQueryTypes.QueryVotesRequest,
      );
      return JSON.stringify(queryVotes);
    case Constants.QUERY.queryParams:
      const queryParams = await Queries.queryParams(
        queryClient as AssistantTypes.QueryClient,
        {
          paramsType: (params as Types.QueryParamsParams).paramsType ?? '',
        } as SDKQueryTypes.QueryParamsRequest,
      );
      return JSON.stringify(queryParams);
    case Constants.QUERY.queryDeposit:
      const queryDeposit = await Queries.queryDeposit(
        queryClient as AssistantTypes.QueryClient,
        {
          proposalId: longify((params as Types.QueryDepositParams).proposalId ?? 0),
          depositor: (params as Types.QueryDepositParams).depositor ?? user?.address ?? '',
        } as SDKQueryTypes.QueryDepositRequest,
      );
      return JSON.stringify(queryDeposit);
    case Constants.QUERY.queryDeposits:
      const queryDeposits = await Queries.queryDeposits(
        queryClient as AssistantTypes.QueryClient,
        {
          proposalId: longify((params as Types.QueryDepositsParams).proposalId ?? 0),
        } as SDKQueryTypes.QueryDepositsRequest,
      );
      return JSON.stringify(queryDeposits);
    // case Constants.QUERY.queryTallyResult:
    //   const queryTallyResult = await Queries.queryTallyResult(
    //     queryClient as AssistantTypes.QueryClient,
    //     {
    //       proposalId: longify((params as Types.QueryTallyResultParams).proposalId ?? 0),
    //     } as SDKQueryTypes.QueryTallyResultRequest,
    //   );
    //   return JSON.stringify(queryTallyResult);
    default:
      throw new Error('Unknown query');
  }
}
