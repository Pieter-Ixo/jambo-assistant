export const transactions = [
  {
    name: 'entity_msgTransferEntity',
    description:
      'Transfer ownership of an entity (aka NFT, stove or asset), identified by its DID, from one account (with a decentralized identifier (DID)) to another.',
    parameters: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'The unique identifier of the entity to be transferred.',
        },
        recipientDid: {
          type: 'string',
          description:
            'The decentralized identifier (DID) of the recipient to whom the entity ownership will be transferred.',
        },
      },
      required: ['id', 'recipientDid'],
    },
  },
  {
    name: 'entity_msgGrantEntityAccountAuthz',
    description:
      'Create an authorization grant from an entity (aka NFT, stove or asset) account (granter) to a specified recipient (grantee) to transfer tokens (e.g. CARBON tokens)',
    parameters: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description:
            'The decentralized identifier (DID) of the entity (aka NFT, stove or asset) from which the authorization grant is being created',
        },
        granteeAddress: {
          type: 'string',
          description:
            'The blockchain address of the grantee, who will be authorized to execute the granted authorization.',
        },
        expiration: {
          type: 'string',
          description:
            'The expiration time of the grant in milliseconds - ensuring the authorization grant is only valid for a specified period of time',
        },
      },
      required: ['id', 'expiration'],
    },
  },
];

export const queries = [
  {
    name: 'entity_getEntityById',
    description: 'Get an entity (aka NFT, stove or asset) by its DID.',
    parameters: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'The unique identifier of the entity to be queried.',
        },
      },
      required: ['id'],
    },
  },
  {
    name: 'entity_getEntitiesByType',
    description: 'Get all entities (aka NFT, stove or asset) of a specific type.',
    parameters: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['asset/collection', 'asset/device', 'asset/dao'],
          description: 'The type of the entities to be queried.',
        },
      },
      required: ['type'],
    },
  },
  {
    name: 'entity_getEntitiesByOwnerAddress',
    description: 'Get all entities (aka NFT, stove or asset) owned by a specific address.',
    parameters: {
      type: 'object',
      properties: {
        ownerAddress: {
          type: 'string',
          description: 'The blockchain address of the owner of the entities to be queried.',
        },
      },
      required: ['ownerAddress'],
    },
  },
  {
    name: 'entity_getEntitiesByOwnerAddressAndType',
    description: 'Get all entities (aka NFT, stove or asset) of a specific type owned by a specific address.',
    parameters: {
      type: 'object',
      properties: {
        ownerAddress: {
          type: 'string',
          description: 'The blockchain address of the owner of the entities to be queried.',
        },
        type: {
          type: 'string',
          enum: ['asset/collection', 'asset/device', 'asset/dao'],
          description: 'The type of the entities to be queried.',
        },
      },
      required: ['ownerAddress', 'type'],
    },
  },
  // {
  //   name: 'entity_queryParams',
  //   description: 'Query the parameters of the ixo entity module.',
  //   parameters: {
  //     type: 'object',
  //     properties: {},
  //     required: [],
  //   },
  // },
  // {
  //   name: 'entity_queryEntity',
  //   description: 'Query an entity (aka NFT, stove or asset) by its DID.',
  //   parameters: {
  //     type: 'object',
  //     properties: {
  //       id: {
  //         type: 'string',
  //         description: 'The unique identifier of the entity to be queried.',
  //       },
  //     },
  //     required: ['id'],
  //   },
  // },
  // {
  //   name: 'entity_queryEntityMetadata',
  //   description: 'Query the metadata of an entity (aka NFT, stove or asset) by its DID.',
  //   parameters: {
  //     type: 'object',
  //     properties: {
  //       id: {
  //         type: 'string',
  //         description: 'The unique identifier of the entity to be queried.',
  //       },
  //     },
  //     required: ['id'],
  //   },
  // },
  // {
  //   name: 'entity_queryEntityIidDocument',
  //   description: 'Query the IID document of an entity (aka NFT, stove or asset) by its DID.',
  //   parameters: {
  //     type: 'object',
  //     properties: {
  //       id: {
  //         type: 'string',
  //         description: 'The unique identifier of the entity to be queried.',
  //       },
  //     },
  //     required: ['id'],
  //   },
  // },
  // {
  //   name: 'entity_queryEntityVerified',
  //   description: 'Query the verification status of an entity (aka NFT, stove or asset) by its DID.',
  //   parameters: {
  //     type: 'object',
  //     properties: {
  //       id: {
  //         type: 'string',
  //         description: 'The unique identifier of the entity to be queried.',
  //       },
  //     },
  //     required: ['id'],
  //   },
  // },
  // {
  //   name: 'entity_queryEntityList',
  //   description: 'Query a list of all entities (aka NFT, stove or asset).',
  //   parameters: {
  //     type: 'object',
  //     properties: {},
  //     required: [],
  //   },
  // },
];
