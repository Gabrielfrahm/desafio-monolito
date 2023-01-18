import { app, sequelize } from "../express";
import request from "supertest";
describe("E2E test for client", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a client adm", async () => {
    const response = await request(app).post("/client").send({
      name: "client 1",
      email: "client@email.com",
      address: "Street 1",
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("client 1");
    expect(response.body.email).toBe("client@email.com");
    expect(response.body.address).toBe("Street 1");
  });

  it("should find a client", async () => {
    const client = await request(app).post("/client").send({
      name: "client 1",
      email: "client@email.com",
      address: "Street 1",
    });

    const response = await request(app)
      .get(`/client/${client.body.id}`)
      .send({});

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe(client.body.name);
    expect(response.body.email).toBe(client.body.email);
    expect(response.body.address).toBe(client.body.address);
  });
});
