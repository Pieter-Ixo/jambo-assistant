export const transactions = [
  {
    name: 'distribution_msgSetWithdrawAddress',
    description:
      'Assign a specific withdrawal address for a delegator, to streamline and direct the withdrawal operations towards the designated address',
    parameters: {
      type: 'object',
      properties: {
        withdrawAddress: {
          type: 'string',
          description:
            "The ixo blockchain address designated to receive the withdrawn reward funds from the delegator's account. The specified withdrawAddress will serve as the target destination for all future withdrawal operations unless altered subsequently",
        },
      },
      required: ['withdrawAddress'],
    },
  },
  {
    name: 'distribution_msgWithdrawDelegatorReward',
    description:
      "The 'msgWithdrawDelegatorReward' message type facilitates the withdrawal of delegation rewards by a delegator from a specific validator. This operation enables the delegator to retrieve the accumulated rewards earned through staking activities with a particular validator, providing a means to access and manage earned staking incentives in the blockchain ecosystem.",
    parameters: {
      type: 'object',
      properties: {
        validatorAddress: {
          type: 'string',
          description: 'The ixo blockchain address of the validator from whom the rewards are to be withdrawn',
        },
      },
      required: ['validatorAddress'],
    },
  },
  // 'distribution_msgWithdrawValidatorCommission'
  // 'distribution_msgFundCommunityPool'
  // {
  //   name: 'distribution_queryParams',
  //   description: 'Query the current distribution parameters',
  //   parameters: {
  //     type: 'object',
  //     properties: {},
  //     required: [],
  //   },
  // },
];

export const queries = [
  {
    name: 'distribution_queryDelegationRewards',
    description: 'Query the accumulated delegation rewards for a particular delegator and validator',
    parameters: {
      type: 'object',
      properties: {
        delegatorAddress: {
          type: 'string',
          description: 'The ixo blockchain address of the delegator',
        },
        validatorAddress: {
          type: 'string',
          description: 'The ixo blockchain address of the validator',
        },
      },
      required: ['validatorAddress'],
    },
  },
  {
    name: 'distribution_queryDelegationTotalRewards',
    description: 'Query the accumulated delegation rewards for a particular delegator',
    parameters: {
      type: 'object',
      properties: {
        delegatorAddress: {
          type: 'string',
          description: 'The ixo blockchain address of the delegator',
        },
      },
    },
  },
  // {
  //   name: 'distribution_queryDelegatorValidators',
  //   description: 'Query all validators that a delegator is bonded to',
  //   parameters: {
  //     type: 'object',
  //     properties: {
  //       delegatorAddress: {
  //         type: 'string',
  //         description: 'The ixo blockchain address of the delegator',
  //       },
  //     },
  //   },
  // },
  {
    name: 'distribution_queryDelegatorWithdrawAddress',
    description: 'Query withdraw address that a delegator has set',
    parameters: {
      type: 'object',
      properties: {
        delegatorAddress: {
          type: 'string',
          description: 'The ixo blockchain address of the delegator',
        },
      },
    },
  },
];
