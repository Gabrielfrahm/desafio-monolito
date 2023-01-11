import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice/invoice.entity";
import Product from "../domain/product/product.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import Address from "../value-object/address.entity";
import InvoicesProductsModel from "./invoice-product.model";
import InvoiceModel from "./invoice.mode";
import ProductModel from "./product.model";
import { v4 as uuid } from "uuid";
export default class InvoiceRepository implements InvoiceGateway {
  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({ where: { id } });
    if (!invoice) {
      throw new Error(`Invoice with id ${id} not found `);
    }

    const items = await InvoicesProductsModel.findAll({
      where: { invoice_id: id },
      include: ["product"],
    });

    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: new Address({
        city: invoice.city,
        complement: invoice.complement,
        number: invoice.number,
        state: invoice.state,
        street: invoice.street,
        zipCode: invoice.zipcode,
      }),
      items: items.map((item) => {
        return new Product({
          id: new Id(item.product.id),
          name: item.product.name,
          price: item.product.price,
        });
      }),
    });
  }

  async generate(input: Invoice): Promise<Invoice> {
    input.items.map(async (item) => {
      return await ProductModel.create({
        id: item.id.id,
        name: item.name,
        price: item.price,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    const invoice = await InvoiceModel.create({
      id: input.id.id,
      name: input.name,
      document: input.document,
      street: input.address.street,
      number: input.address.number,
      zipcode: input.address.zipCode,
      city: input.address.city,
      complement: input.address.complement,
      state: input.address.state,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    input.items.map(async (item) => {
      return await InvoicesProductsModel.create({
        id: uuid(),
        product_id: item.id.id,
        invoice_id: invoice.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    return new Invoice({
      name: input.name,
      document: input.document,
      address: new Address({
        city: input.address.city,
        complement: input.address.complement,
        number: input.address.number,
        state: input.address.state,
        street: input.address.street,
        zipCode: input.address.zipCode,
      }),
      items: input.items.map((item) => {
        return new Product({
          name: item.name,
          price: item.price,
        });
      }),
    });
  }
}
