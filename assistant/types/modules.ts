// export enum MODULE_GROUPS {
//   cosmos = 'cosmos',
//   cosmwasm = 'cosmwasm',
//   ibc = 'ibc',
//   ixo = 'ixo',
// }

export enum MODULES {
  /** ========== cosmos ========== */
  bank = 'bank',
  distribution = 'distribution',
  feegrant = 'feegrant',
  gov = 'gov',
  staking = 'staking',
  /** ========== ibc ========== */
  ibc = 'ibc',
  /** ========== ixo ========== */
  entity = 'entity',
  token = 'token',
}

// export type WHITELIST_OPTIONS = MODULES | MODULE_GROUPS;

// export type WHITELIST = Array<WHITELIST_OPTIONS>;
