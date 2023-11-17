import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin';
import { ProposalStatus } from '@ixo/impactxclient-sdk/types/codegen/cosmos/gov/v1beta1/gov';

export type MsgVoteParams = {
  proposalId: string;
  option: string; // TODO: enum
  metadata: string;
};

export type MsgDepositParams = {
  proposalId: string;
  amount: Coin[];
};

export type QueryProposalParams = {
  proposalId: string;
};

export type QueryProposalsParams = {
  proposalStatus: ProposalStatus;
  voter?: string;
  depositor?: string;
  limit?: number;
};

export type QueryVoteParams = {
  proposalId: string;
  voter?: string;
};

export type QueryVotesParams = {
  proposalId: string;
};

export type QueryParamsParams = {
  paramsType: string;
};

export type QueryDepositParams = {
  proposalId: string;
  depositor?: string;
};

export type QueryDepositsParams = {
  proposalId: string;
};

export type QueryTallyResultParams = {
  proposalId: string;
};

export type TxParams = MsgVoteParams | MsgDepositParams;

export type QueryParams =
  | QueryProposalParams
  | QueryProposalsParams
  | QueryVoteParams
  | QueryVotesParams
  | QueryParamsParams
  | QueryDepositParams
  | QueryDepositsParams
  | QueryTallyResultParams;
