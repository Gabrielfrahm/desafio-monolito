import { app, sequelize } from "../express";
import request from "supertest";
describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
      description: "Product",
      purchasePrice: 50,
      stock: 2,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.description).toBe("Product");
    expect(response.body.stock).toBe(2);
  });

  it("should check a stock product", async () => {
    const product = await request(app).post("/product").send({
      name: "Product 1",
      description: "Product",
      purchasePrice: 50,
      stock: 2,
    });

    const response = await request(app)
      .get(`/product/${product.body.id}`)
      .send({});

    expect(response.status).toBe(200);
    expect(response.body.productId).toBe(product.body.id);
    expect(response.body.stock).toBe(product.body.stock);
  });
});
