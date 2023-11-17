export interface TransactionMessage {
  typeUrl: string;
  value: any;
}

export type TransactionRequest = TransactionMessage[];

export interface TransactionResponse {
  code: number;
  gasUsed: number;
  gasWanted: number;
  height: number;
  rawLog: string;
  transactionHash: string;
}
