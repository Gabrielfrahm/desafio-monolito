export interface FindStoreCatalogFacadeInputDto {
  id: string;
}

export interface FindStoreCatalogFacadeOutPutDto {
  id: string;
  name: string;
  description: string;
  salesPrice: string;
}

export interface FindAllStoreCatalogFacadeOutPutDto {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: string;
  }[];
}

export default interface StoreCatalogFacadeInterface {
  find(
    id: FindStoreCatalogFacadeInputDto
  ): Promise<FindStoreCatalogFacadeOutPutDto>;
  findAll(): Promise<FindAllStoreCatalogFacadeOutPutDto>;
}
