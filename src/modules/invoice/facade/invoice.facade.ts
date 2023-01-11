import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import InvoiceFacadeInterface, {
  FindInvoiceFacadeFacadeInputDto,
  FindInvoiceFacadeOutPutDto,
  GenerateInvoiceFacadeInputDto,
  GenerateInvoiceFacadeOutputDto,
} from "./invoice.facade.interface";

export interface UseCaseProps {
  findUseCase: UseCaseInterface;
  generateUseCase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _findUseCase: UseCaseInterface;
  private _generateUseCase: UseCaseInterface;

  constructor(useCaseProps: UseCaseProps) {
    this._findUseCase = useCaseProps.findUseCase;
    this._generateUseCase = useCaseProps.generateUseCase;
  }
  find(
    id: FindInvoiceFacadeFacadeInputDto
  ): Promise<FindInvoiceFacadeOutPutDto> {
    return this._findUseCase.execute(id);
  }
  generate(
    input: GenerateInvoiceFacadeInputDto
  ): Promise<GenerateInvoiceFacadeOutputDto> {
    return this._generateUseCase.execute(input);
  }
}
