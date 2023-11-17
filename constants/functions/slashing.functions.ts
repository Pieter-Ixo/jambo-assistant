export const functions = [
  {
    name: 'slashing_msgUnjail',
    description:
      "The 'slashing_msgUnjail' message type enables a jailed validator to request for unjailing, signifying the initiation of the process to lift the punitive restrictions imposed due to misbehaviors in the network. Utilizing the validator's address as a unique identifier, it facilitates a secure, verifiable, and accountable method of requesting unjailing in the decentralized network, ensuring that the validator is accurately identified and reliably managed within the context of penalization and rehabilitation processes.",
    parameters: {
      type: 'object',
      properties: {
        validatorAddr: {
          type: 'string',
          description:
            'The unique address of the validator, serving as a distinct identifier that ensures secure, accurate, and reliable referencing in the process of unjailing. It safeguards the legitimacy, authenticity, and accountability of the unjailing request, protecting the network against unauthorized, invalid, and illicit unjailing activities, and maintaining the credibility, integrity, and stability of the penalization and recovery mechanisms within the decentralized governance system.',
        },
      },
      required: ['validatorAddr'],
    },
  },
];
