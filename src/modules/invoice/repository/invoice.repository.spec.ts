import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice/invoice.entity";
import Product from "../domain/product/product.entity";
import Address from "../value-object/address.entity";
import InvoicesProductsModel from "./invoice-product.model";
import InvoiceModel from "./invoice.mode";
import InvoiceRepository from "./invoice.repository";
import ProductModel from "./product.model";

describe("invoice repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel, InvoiceModel, InvoicesProductsModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find an invoice", async () => {
    const repository = new InvoiceRepository();

    const product = await ProductModel.create({
      id: "1",
      name: "Product 1",
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

    const invoiceProduct = await InvoicesProductsModel.create({
      id: "1",
      product_id: product.id,
      invoice_id: invoice.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const invoiceFind = await repository.find(invoice.id);

    expect(invoiceFind.id.id).toBe(invoice.id);
    expect(invoiceFind.name).toBe(invoice.name);
    expect(invoiceFind.document).toBe(invoice.document);
    expect({
      id: invoiceFind.items[0].id.id,
      name: invoiceFind.items[0].name,
      price: invoiceFind.items[0].price,
    }).toEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
    expect(invoiceProduct.product_id).toBe(product.id);
    expect(invoiceProduct.invoice_id).toBe(invoice.id);
  });

  it("should generate an invoice", async () => {
    const repository = new InvoiceRepository();

    const invoice = new Invoice({
      name: "invoice 1",
      document: "123456",
      address: new Address({
        street: "street 1",
        number: "123",
        complement: "complement",
        city: "city",
        state: "state",
        zipCode: "123456",
      }),
      items: [
        new Product({
          name: "product 1",
          price: 500,
        }),
      ],
    });

    const result = await repository.generate(invoice);
    expect(result.id.id).toBeDefined();
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.items[0].name).toBe(invoice.items[0].name);
    expect(result.items[0].price).toBe(invoice.items[0].price);
    expect(result.itemTotal()).toBe(500);
  });
});
