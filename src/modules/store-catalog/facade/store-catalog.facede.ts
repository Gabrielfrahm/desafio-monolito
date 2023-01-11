import UseCaseInterface from "../../@shared/usecase/usecase.interface";

import StoreCatalogFacadeInterface, {
  FindAllStoreCatalogFacadeOutPutDto,
  FindStoreCatalogFacadeInputDto,
  FindStoreCatalogFacadeOutPutDto,
} from "./store-catalog.facade.interface";

export interface UseCaseProps {
  findUseCase: UseCaseInterface;
  findAllUseCase: UseCaseInterface;
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _findUseCase: UseCaseInterface;
  private _findAllUseCase: UseCaseInterface;

  constructor(useCaseProps: UseCaseProps) {
    this._findUseCase = useCaseProps.findUseCase;
    this._findAllUseCase = useCaseProps.findAllUseCase;
  }
  find(
    id: FindStoreCatalogFacadeInputDto
  ): Promise<FindStoreCatalogFacadeOutPutDto> {
    return this._findUseCase.execute(id);
  }
  findAll(): Promise<FindAllStoreCatalogFacadeOutPutDto> {
    return this._findAllUseCase.execute({});
  }
}
