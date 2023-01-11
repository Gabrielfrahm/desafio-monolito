export interface ProcessPaymentInputDto {
  amount: number;
  orderId: string;
}

export interface ProcessPaymentOutPutDto {
  transactionId: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
