import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import ClientAdmFacadeInterface, {
  AddClientFacadeInputDto,
  FindClientFacadeInputDto,
  FindClientFacadeOutPutDto,
} from "./client-adm.facade.interface";

export interface useCaseProps {
  findUseCase: UseCaseInterface;
  addUSeCase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _findUseCase: UseCaseInterface;
  private _addUseCase: UseCaseInterface;

  constructor(useCaseProps: useCaseProps) {
    this._findUseCase = useCaseProps.findUseCase;
    this._addUseCase = useCaseProps.addUSeCase;
  }

  async add(input: AddClientFacadeInputDto): Promise<void> {
    return await this._addUseCase.execute(input);
  }
  async find(
    input: FindClientFacadeInputDto
  ): Promise<FindClientFacadeOutPutDto> {
    return await this._findUseCase.execute(input);
  }
}
