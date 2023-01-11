import { Sequelize } from "sequelize-typescript";
import PaymentFacadeFactory from "../factory/payment.facade.factory";
import { TransactionModel } from "../repository/transaction.model";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-paymente/process-payment.usecase";
import PaymentFacade from "./payment.facade";

describe("payment Facade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a transaction", async () => {
    // const repository = new TransactionRepository();
    // const useCase = new ProcessPaymentUseCase(repository);
    // const facade = new PaymentFacade(useCase);
    const facade = PaymentFacadeFactory.create();

    const input = {
      orderId: "1",
      amount: 100,
    };

    const outPut = await facade.process(input);

    expect(outPut.transactionId).toBeDefined();
    expect(outPut.orderId).toBe("1");
    expect(outPut.amount).toBe(input.amount);
    expect(outPut.status).toBe("approved");
  });
});
