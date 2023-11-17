export const transactions = [
  // 'gov_msgSubmitProposal'
  {
    name: 'gov_msgVote',
    description:
      'Let a user of the ixo blockchain network cast a vote on a governance proposal, enabling a democratic and participative mechanism to drive collective decision-making',
    parameters: {
      type: 'object',
      properties: {
        proposalId: {
          type: 'integer',
          description: 'The unique identifier of the proposal being voted upon',
        },
        option: {
          type: 'string',
          enum: ['0', '1', '2', '3', '4'],
          description:
            'The voting option selected by the voter, expressing their stance or preference regarding the proposal. 0 = VOTE_UNSPECIFIED, 1 = VOTE_YES, 2 = VOTE_ABSTAIN, 3 = VOTE_NO, 4 = VOTE_NO_WITH_VETO',
        },
      },
      required: ['proposalId', 'option'],
    },
  },
  // 'gov_msgVoteWeighted'
  {
    name: 'gov_msgDeposit',
    description:
      "Facilitates the process of submitting a deposit to a pre-existing proposal within the blockchain network's governance mechanism. It allows participants to financially back a proposal, evidencing their support and simultaneously contributing to the threshold required to trigger a network-wide vote",
    parameters: {
      type: 'object',
      properties: {
        proposalId: {
          type: 'integer',
          description: 'The unique numerical identifier of the proposal that is receiving the deposit',
        },
        amount: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              denom: {
                type: 'string',
                description: 'The specific denomination or type of the tokens being deposited',
              },
              amount: {
                type: 'string',
                description:
                  'The numerical quantity of tokens being deposited - string representation of a positive integer',
              },
            },
            required: ['denom', 'amount'],
          },
          description: 'A detailed breakdown of the tokens being deposited',
        },
      },
      required: ['proposalId', 'amount'],
    },
  },
];

export const queries = [
  {
    name: 'gov_queryProposal',
    description: 'Query the details of a specific proposal',
    parameters: {
      type: 'object',
      properties: {
        proposalId: {
          type: 'integer',
          description: 'The unique numerical identifier of the proposal being queried',
        },
      },
      required: ['proposalId'],
    },
  },
  {
    name: 'gov_queryProposals',
    description:
      'Query the details of all proposals matching the specified criteria - to query all proposals regardless of status, set the proposalStatus to PROPOSAL_STATUS_UNSPECIFIED',
    parameters: {
      type: 'object',
      properties: {
        proposalStatus: {
          type: 'string',
          enum: [
            'PROPOSAL_STATUS_UNSPECIFIED',
            'PROPOSAL_STATUS_DEPOSIT_PERIOD',
            'PROPOSAL_STATUS_VOTING_PERIOD',
            'PROPOSAL_STATUS_PASSED',
            'PROPOSAL_STATUS_REJECTED',
            'PROPOSAL_STATUS_FAILED',
          ],
          description: 'The status of the proposals to be queried',
        },
        voter: {
          type: 'string',
          description: 'The ixo blockchain address of the voter - only needed if querying by voter',
        },
        depositor: {
          type: 'string',
          description: 'The ixo blockchain address of the depositor - only needed if querying by depositor',
        },
        limit: {
          type: 'integer',
          description: 'The maximum number of proposals to be returned - cannot exceed 10',
        },
      },
      required: ['proposalStatus'],
    },
  },
  {
    name: 'gov_queryVote',
    description: 'Query the vote details of a specific voter on a specific proposal',
    parameters: {
      type: 'object',
      properties: {
        proposalId: {
          type: 'integer',
          description: 'The unique numerical identifier of the proposal that was voted upon',
        },
        voter: {
          type: 'string',
          description: 'The ixo blockchain address of the voter',
        },
      },
      required: ['proposalId'],
    },
  },
  {
    name: 'gov_queryVotes',
    description: 'Query the details of all votes for a specific proposal',
    parameters: {
      type: 'object',
      properties: {
        proposalId: {
          type: 'integer',
          description: 'The unique numerical identifier of the proposal that was voted upon',
        },
      },
      required: ['proposalId'],
    },
  },
  {
    name: 'gov_queryParams',
    description: 'Query the details of the governance parameters',
    parameters: {
      type: 'object',
      properties: {
        paramsType: {
          type: 'string',
          enum: ['voting', 'deposit', 'tallying'],
          description: 'The type of governance parameters to be queried',
        },
      },
      required: ['paramsType'],
    },
  },
  {
    name: 'gov_queryDeposit',
    description: "Query the details of a voter's deposit on a specific proposal",
    parameters: {
      type: 'object',
      properties: {
        proposalId: {
          type: 'integer',
          description: 'The unique numerical identifier of the proposal that received the deposit',
        },
        depositor: {
          type: 'string',
          description: 'The ixo blockchain address of the depositor',
        },
      },
      required: ['proposalId'],
    },
  },
  {
    name: 'gov_queryDeposits',
    description: 'Query the details of all deposits for the specified proposal',
    parameters: {
      type: 'object',
      properties: {
        proposalId: {
          type: 'integer',
          description: 'The unique numerical identifier of the proposal that received the deposit',
        },
      },
      required: ['proposalId'],
    },
  },
  // {
  //   name: 'gov_queryTallyResult',
  //   description: 'Query the details of the tally result for a specific proposal',
  //   parameters: {
  //     type: 'object',
  //     properties: {
  //       proposalId: {
  //         type: 'integer',
  //         description: 'The unique numerical identifier of the proposal that received the deposit',
  //       },
  //     },
  //     required: ['proposalId'],
  //   },
  // },
];
