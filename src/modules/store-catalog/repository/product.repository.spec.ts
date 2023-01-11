import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe("Product repository Test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find all products", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "a",
      salesPrice: 10,
    });
    await ProductModel.create({
      id: "2",
      name: "Product 2",
      description: "a",
      salesPrice: 20,
    });

    const repository = new ProductRepository();
    const products = await repository.findAll();

    expect(products.length).toBe(2);
    expect(products[0].name).toEqual("Product 1");
    expect(products[0].description).toEqual("a");
    expect(products[0].salesPrice).toEqual(10);
    expect(products[1].name).toEqual("Product 2");
    expect(products[1].description).toEqual("a");
    expect(products[1].salesPrice).toEqual(20);
  });

  it("should find a product", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "a",
      salesPrice: 10,
    });

    const repository = new ProductRepository();
    const input = {
      id: "1",
    };

    const product = await repository.find(input.id);

    expect(product.id.id).toBe("1");
    expect(product.name).toEqual("Product 1");
    expect(product.description).toEqual("a");
    expect(product.salesPrice).toEqual(10);
  });
});
