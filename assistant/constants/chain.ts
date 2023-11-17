export enum ChainNetwork {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
  DEVNET = 'devnet',
}

export const RPC_ENDPOINTS = {
  [ChainNetwork.MAINNET]: 'https://impacthub.ixo.world/rpc/',
  [ChainNetwork.TESTNET]: 'https://testnet.ixo.earth/rpc/',
  [ChainNetwork.DEVNET]: 'https://devnet.ixo.earth/rpc/',
};
