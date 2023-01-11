import { Sequelize } from "sequelize-typescript";
import ProductAdmFacadeFactory from "../factory/product-adm.factory";
import { ProductModel } from "../repository/product.model";

describe("ProductAdmFacade test", () => {
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

  it("should create a product", async () => {
    const productFacade = ProductAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Product 1",
      description: " nice Product",
      purchasePrice: 10,
      stock: 9,
    };

    await productFacade.addProduct(input);

    const product = await ProductModel.findOne({ where: { id: input.id } });
    expect(product.id).toBeDefined();
    expect(product.id).toEqual(input.id);
    expect(product.name).toEqual(input.name);
    expect(product.description).toEqual(input.description);
    expect(product.purchasePrice).toEqual(input.purchasePrice);
    expect(product.stock).toEqual(input.stock);
  });
  it("should check stock product", async () => {
    const productFacade = ProductAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Product 1",
      description: " nice Product",
      purchasePrice: 10,
      stock: 9,
    };

    await productFacade.addProduct(input);

    const result = await productFacade.checkStock({ productId: input.id });

    expect(result.productId).toBeDefined();
    expect(result.productId).toEqual(input.id);
    expect(result.stock).toEqual(input.stock);
  });
});
