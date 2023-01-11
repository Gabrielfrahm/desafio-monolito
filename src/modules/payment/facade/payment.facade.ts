import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import PaymentFacadeInterface, {
  PaymentFacadeInputDto,
  PaymentFacadeOutPutDto,
} from "./facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
  constructor(private _processPaymentUseCase: UseCaseInterface) {
    this._processPaymentUseCase = _processPaymentUseCase;
  }

  async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutPutDto> {
    return this._processPaymentUseCase.execute(input);
  }
}
