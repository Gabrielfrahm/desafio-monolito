import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice/invoice.entity";
import Product from "../../domain/product/product.entity";
import Address from "../../value-object/address.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

const item = new Product({
  id: new Id("1"),
  name: "Product 1",
  price: 50,
});

const item2 = new Product({
  id: new Id("2"),
  name: "Product 2",
  price: 50,
});

const invoice = new Invoice({
  id: new Id("1"),
  name: "invoice 1",
  document: "document 1",
  address: new Address({
    street: "street 1",
    city: "city 1",
    complement: "complemnte 1",
    number: "10",
    state: "sp",
    zipCode: "123456",
  }),
  items: [item, item2],
});

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(invoice),
    generate: jest.fn(),
  };
};

describe("find invoice use case", () => {
  it("should find a invoice", async () => {
    const repository = MockRepository();
    const useCase = new FindInvoiceUseCase(repository);

    const input = {
      id: "1",
    };

    const result = await useCase.execute(input);

    expect(repository.find).toHaveBeenCalled();

    expect(result.id).toBeDefined();
    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(invoice.name);
    expect(result.document).toEqual(invoice.document);
    expect(result.items).toEqual(
      invoice.items.map((item) => {
        return {
          id: item.id.id,
          name: item.name,
          price: item.price,
        };
      })
    );
    expect(result.total).toEqual(100);
  });
});
