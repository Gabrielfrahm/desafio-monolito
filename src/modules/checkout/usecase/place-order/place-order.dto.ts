export interface PlaceOrderInputDto {
  clientId: string;
  products: {
    productId: string;
  }[];
}

export interface PlaceOrderOutPutDto {
  id: string;
  invoice_id: string;
  status: string;
  total: number;
  products: {
    productId: string;
  }[];
}
