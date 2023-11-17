export const transactions = [
  // 'staking_msgCreateValidator'
  // 'staking_msgEditValidator'
  {
    name: 'staking_msgDelegate',
    description: 'A blockchain transaction for the delegation (aka staking) of coins from a delegator to a validator',
    parameters: {
      type: 'object',
      properties: {
        validatorAddress: {
          type: 'string',
          description: 'The ixo address of the validator to which tokens are being delegated(staked)',
        },
        denom: {
          type: 'string',
          enum: ['ixo', 'uixo'],
          description: 'The denomination of the tokens to undelegate.',
        },
        amount: {
          type: 'string',
          description:
            'The quantity of tokens to delegate (aka stake) - string representation of a valid positive integer',
        },
      },
      required: ['validatorAddress', 'denom', 'amount'],
    },
  },
  {
    name: 'staking_msgBeginRedelegate',
    description:
      'Perform a redelegation (aka restaking) of tokens (belonging to a delegator) from a source validator to a destination validator - moving the delegated (staked) tokens from one validator to another.',
    parameters: {
      type: 'object',
      properties: {
        validatorSrcAddress: {
          type: 'string',
          description: 'The source validator address from which tokens are being redelegated (restaked)',
        },
        validatorDstAddress: {
          type: 'string',
          description: 'The destination validator address to which tokens are being redelegated (restaked)',
        },
        denom: {
          type: 'string',
          enum: ['ixo', 'uixo'],
          description: 'The denomination of the tokens to undelegate.',
        },
        amount: {
          type: 'string',
          description:
            'The quantity of tokens to redelegate (aka restake) - string representation of a valid positive integer',
        },
      },
      required: ['validatorSrcAddress', 'validatorDstAddress', 'denom', 'amount'],
    },
  },
  {
    name: 'staking_msgUndelegate',
    description:
      "Perform an undelegation (aka unstaking) of the delegator's tokens from a validator - not necessarily all the tokens delegated to the validator",
    parameters: {
      type: 'object',
      properties: {
        validatorAddress: {
          type: 'string',
          description: 'The address of the validator from whom tokens are being undelegated (aka unstaked)',
        },
        denom: {
          type: 'string',
          enum: ['ixo', 'uixo'],
          description: 'The denomination of the tokens to undelegate.',
        },
        amount: {
          type: 'string',
          description: 'The quantity of tokens to undelegate - string representation of a valid positive integer',
        },
      },
      required: ['validatorAddress', 'amount', 'denom'],
    },
  },
];

export const queries = [
  {
    name: 'staking_queryValidators',
    description: 'Query all validators',
    parameters: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['BOND_STATUS_UNSPECIFIED', 'BOND_STATUS_UNBONDED', 'BOND_STATUS_UNBONDING', 'BOND_STATUS_BONDED'],
          description: 'The status of the validators to query',
        },
      },
    },
  },
  {
    name: 'staking_queryValidator',
    description: 'Query a validator',
    parameters: {
      type: 'object',
      properties: {
        validatorAddr: {
          type: 'string',
          description: 'The address of the validator to query',
        },
      },
      required: ['validatorAddr'],
    },
  },
  {
    name: 'staking_queryValidatorDelegations',
    description: 'Query a validator delegations',
    parameters: {
      type: 'object',
      properties: {
        validatorAddr: {
          type: 'string',
          description: 'The address of the validator to query',
        },
      },
      required: ['validatorAddr'],
    },
  },
  {
    name: 'staking_queryValidatorUnbondingDelegations',
    description: 'Query a validator unbonding delegations',
    parameters: {
      type: 'object',
      properties: {
        validatorAddr: {
          type: 'string',
          description: 'The address of the validator to query',
        },
      },
      required: ['validatorAddr'],
    },
  },
  {
    name: 'staking_queryDelegation',
    description: 'Query a delegation',
    parameters: {
      type: 'object',
      properties: {
        validatorAddr: {
          type: 'string',
          description: 'The address of the validator to query',
        },
        delegatorAddr: {
          type: 'string',
          description: 'The address of the delegator to query',
        },
      },
      required: ['validatorAddr'],
    },
  },
  {
    name: 'staking_queryUnbondingDelegation',
    description: 'Query an unbonding delegation',
    parameters: {
      type: 'object',
      properties: {
        validatorAddr: {
          type: 'string',
          description: 'The address of the validator to query',
        },
        delegatorAddr: {
          type: 'string',
          description: 'The address of the delegator to query',
        },
      },
      required: ['validatorAddr'],
    },
  },
  {
    name: 'staking_queryDelegatorDelegations',
    description: 'Query a delegator delegations',
    parameters: {
      type: 'object',
      properties: {
        delegatorAddr: {
          type: 'string',
          description: 'The address of the delegator to query',
        },
      },
    },
  },
  {
    name: 'staking_queryDelegatorUnbondingDelegations',
    description: 'Query a delegator unbonding delegations',
    parameters: {
      type: 'object',
      properties: {
        delegatorAddr: {
          type: 'string',
          description: 'The address of the delegator to query',
        },
      },
    },
  },
  {
    name: 'staking_queryRedelegations',
    description: 'Query a redelegation',
    parameters: {
      type: 'object',
      properties: {
        delegatorAddr: {
          type: 'string',
          description: 'The address of the delegator to query',
        },
        srcValidatorAddr: {
          type: 'string',
          description: 'The address of the source validator to query',
        },
        dstValidatorAddr: {
          type: 'string',
          description: 'The address of the destination validator to query',
        },
      },
      required: ['srcValidatorAddr', 'dstValidatorAddr'],
    },
  },
  {
    name: 'staking_queryDelegatorValidators',
    description: 'Query a delegator validators',
    parameters: {
      type: 'object',
      properties: {
        delegatorAddr: {
          type: 'string',
          description: 'The address of the delegator to query',
        },
      },
    },
  },
  // {
  //   name: 'staking_queryHistoricalInfo',
  //   description: 'Query historical info',
  //   parameters: {
  //     type: 'object',
  //     properties: {
  //       height: {
  //         type: 'string',
  //         description: 'The height at which to query the historical info',
  //       },
  //     },
  //   },
  // },
  // {
  //   name: 'staking_queryPool',
  //   description: 'Query the pool',
  // },
  // {
  //   name: 'staking_queryParams',
  //   description: 'Query the params',
  // },
];
