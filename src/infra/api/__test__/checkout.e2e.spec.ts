import { app, sequelize } from "../express";
import request from "supertest";
describe("E2E test for checkout", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  // it("should create a client adm", async () => {
  //   const response = await request(app).post("/client").send({
  //     name: "client 1",
  //     email: "client@email.com",
  //     address: "Street 1",
  //   });

  //   expect(response.status).toBe(200);
  //   expect(response.body.name).toBe("client 1");
  //   expect(response.body.email).toBe("client@email.com");
  //   expect(response.body.address).toBe("Street 1");
  // });
});
