import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import Transaction from "../../domain/transaction";
import PaymentGateway from "../../gateway/process-payment.gateway";
import {
  ProcessPaymentInputDto,
  ProcessPaymentOutPutDto,
} from "./process-payment.dto";

export default class ProcessPaymentUseCase implements UseCaseInterface {
  constructor(private _transactionRepository: PaymentGateway) {
    this._transactionRepository = _transactionRepository;
  }

  async execute(
    input: ProcessPaymentInputDto
  ): Promise<ProcessPaymentOutPutDto> {
    const transaction = new Transaction({
      amount: input.amount,
      orderId: input.orderId,
    });
    transaction.process();

    const persistTransaction = await this._transactionRepository.save(
      transaction
    );

    return {
      transactionId: persistTransaction.id.id,
      orderId: persistTransaction.orderId,
      amount: persistTransaction.amount,
      status: transaction.status,
      createdAt: persistTransaction.createdAt,
      updatedAt: persistTransaction.updatedAt,
    };
  }
}
