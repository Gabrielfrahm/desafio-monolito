import { Sequelize } from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/facade.factory";
import InvoicesProductsModel from "../repository/invoice-product.model";
import InvoiceModel from "../repository/invoice.mode";
import InvoiceRepository from "../repository/invoice.repository";
import ProductModel from "../repository/product.model";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacade from "./invoice.facade";

describe("invoice Facade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([InvoiceModel, InvoicesProductsModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const product = await ProductModel.create({
      id: "1",
      name: "product 1",
      price: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const invoice = await InvoiceModel.create({
      id: "1",
      name: "teste 1",
      document: "44444444",
      street: "street 1",
      number: "100",
      zipcode: "123",
      city: "city",
      complement: "123",
      state: "sp",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await InvoicesProductsModel.create({
      id: "1",
      product_id: product.id,
      invoice_id: invoice.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const input = {
      id: "1",
    };

    const outPut = await facade.find(input);

    expect(outPut.id).toBeDefined();
    expect(outPut.name).toBe(invoice.name);
    expect(outPut.document).toBe(invoice.document);
    expect(outPut.total).toBe(100);
  });

  it("should generate a invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const input = {
      name: "invoice",
      document: "123",
      street: "street",
      number: "213",
      complement: "complement",
      city: "city",
      state: "sp",
      zipCode: "123456",
      items: [
        {
          id: "1",
          name: "product 1",
          price: 500,
        },
      ],
    };

    const outPut = await facade.generate(input);

    expect(outPut.id).toBeDefined();
    expect(outPut.name).toBe(input.name);
    expect(outPut.document).toBe(input.document);
    expect(outPut.total).toBe(500);
  });
});
