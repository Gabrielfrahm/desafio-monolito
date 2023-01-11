export interface CheckStockInputDto {
  productId: string;
}

export interface CheckStockOutPutDto {
  productId: string;
  stock: number;
}
