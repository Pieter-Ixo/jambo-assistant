export const functions = [
  {
    name: 'ixo_createIidDocument',
    description: 'Create a new IID Document.',
    parameters: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'The DID identifier.',
        },
        controllers: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'The list of controller DIDs.',
        },
        context: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              key: {
                type: 'string',
                description: 'Context key.',
              },
              val: {
                type: 'string',
                description: 'Context value.',
              },
            },
            required: ['key', 'val'],
          },
          description: 'The list of contexts.',
        },
        verifications: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              relationships: {
                type: 'array',
                items: {
                  type: 'string',
                },
                description: 'Verification relationships.',
              },
              method: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    description: 'Verification method ID.',
                  },
                  type: {
                    type: 'string',
                    description: 'Verification method type.',
                  },
                  controller: {
                    type: 'string',
                    description: 'Verification method controller.',
                  },
                  blockchainAccountID: {
                    type: 'string',
                    description: 'Blockchain Account ID.',
                    optional: true,
                  },
                  publicKeyHex: {
                    type: 'string',
                    description: 'Public Key in Hex format.',
                    optional: true,
                  },
                  publicKeyMultibase: {
                    type: 'string',
                    description: 'Public Key in Multibase format.',
                    optional: true,
                  },
                  publicKeyBase58: {
                    type: 'string',
                    description: 'Public Key in Base58 format.',
                    optional: true,
                  },
                },
                required: ['id', 'type', 'controller'],
              },
              context: {
                type: 'array',
                items: {
                  type: 'string',
                },
                description: 'Verification context.',
              },
            },
            required: ['relationships', 'context'],
          },
          description: 'The list of verifications.',
        },
        services: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'Service ID.',
              },
              type: {
                type: 'string',
                description: 'Service type.',
              },
              serviceEndpoint: {
                type: 'string',
                description: 'Service endpoint.',
              },
            },
            required: ['id', 'type', 'serviceEndpoint'],
          },
          description: 'The list of services.',
        },
        accordedRight: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                description: 'Type of the accorded right.',
              },
              id: {
                type: 'string',
                description: 'ID of the accorded right.',
              },
              mechanism: {
                type: 'string',
                description: 'Mechanism of the accorded right.',
              },
              message: {
                type: 'string',
                description: 'Message of the accorded right.',
              },
              service: {
                type: 'string',
                description: 'Service of the accorded right.',
              },
            },
            required: ['type', 'id', 'mechanism', 'message', 'service'],
          },
          description: 'The list of accorded rights.',
        },
        linkedResource: {
          type: 'array',
          description: 'Linked resources to the IID Document.',
          optional: true,
          items: {
            type: 'object',
            properties: {
              type: { type: 'string' },
              id: { type: 'string' },
              description: { type: 'string' },
              mediaType: { type: 'string' },
              serviceEndpoint: { type: 'string' },
              proof: { type: 'string' },
              encrypted: { type: 'string' },
              right: { type: 'string' },
            },
            required: ['type', 'id', 'description', 'mediaType', 'serviceEndpoint', 'proof', 'encrypted', 'right'],
          },
        },
        linkedEntity: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                description: 'Linked entity type.',
              },
              id: {
                type: 'string',
                description: 'Linked entity ID.',
              },
              relationship: {
                type: 'string',
                description: 'Relationship of the linked entity.',
              },
              service: {
                type: 'string',
                description: 'Service of the linked entity.',
              },
            },
            required: ['type', 'id', 'relationship', 'service'],
          },
          description: 'The list of linked entities.',
        },
        alsoKnownAs: {
          type: 'string',
          description: 'Alternative name the IID is also known as.',
          optional: true,
        },
        signer: {
          type: 'string',
          description: 'Address of the account signing the message.',
        },
        linkedClaim: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                description: 'Type of the linked claim.',
              },
              id: {
                type: 'string',
                description: 'ID of the linked claim.',
              },
              description: {
                type: 'string',
                description: 'Description of the linked claim.',
              },
              serviceEndpoint: {
                type: 'string',
                description: 'Service endpoint of the linked claim.',
              },
              proof: {
                type: 'string',
                description: 'Proof of the linked claim.',
              },
              encrypted: {
                type: 'string',
                description: 'Encryption status of the linked claim.',
              },
              right: {
                type: 'string',
                description: 'Rights associated with the linked claim.',
              },
            },
            required: ['type', 'id', 'description', 'serviceEndpoint', 'proof', 'encrypted', 'right'],
          },
          description: 'The list of linked claims.',
        },
      },
      required: [
        'id',
        'controllers',
        'context',
        'verifications',
        'services',
        'accordedRight',
        'linkedEntity',
        'signer',
      ],
    },
  },
];
