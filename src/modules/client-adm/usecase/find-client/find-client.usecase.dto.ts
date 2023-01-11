export interface FindClientInputDto {
  id: string;
}

export interface FindClientOutPutDto {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}
