import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice/invoice.entity";
import Product from "../../domain/product/product.entity";

import Address from "../../value-object/address.entity";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  price: 500,
});

const invoice = new Invoice({
  id: new Id("1"),
  name: "invoice",
  document: "123",
  address: new Address({
    city: "city",
    complement: "complement",
    number: "213",
    state: "sp",
    street: "street",
    zipCode: "123456",
  }),
  items: [product],
});

const MockRepository = () => {
  return {
    find: jest.fn(),
    generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};
describe("generate invoice test use case", () => {
  it("should generate an invoice", async () => {
    const repository = MockRepository();
    const useCase = new GenerateInvoiceUseCase(repository);
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

    const result = await useCase.execute(input);

    expect(result.id).toBeDefined();

    expect(repository.generate).toHaveBeenCalled();
    expect(result.name).toBe(input.name);
    expect(result.document).toBe(input.document);
    expect(result.city).toBe(input.city);
    expect(result.complement).toBe(input.complement);
    expect(result.number).toBe(input.number);
    expect(result.state).toBe(input.state);
    expect(result.street).toBe(input.street);
    expect(result.zipCode).toBe(input.zipCode);
    expect(result.items[0]).toEqual({
      id: input.items[0].id,
      name: input.items[0].name,
      price: input.items[0].price,
    });
    expect(result.total).toBe(500);
  });
});
