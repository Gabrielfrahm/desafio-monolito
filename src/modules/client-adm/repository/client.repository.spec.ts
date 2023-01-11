import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";

describe("cliente repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const client = new Client({
      id: new Id("1"),
      name: "Client 1",
      email: "x@x.com",
      address: "Address 1",
    });

    const repository = new ClientRepository();
    await repository.add(client);

    const findClient = await ClientModel.findOne({
      where: { id: client.id.id },
    });

    expect(findClient).toBeDefined();
    expect(findClient.id).toEqual(client.id.id);
    expect(findClient.name).toEqual(client.name);
    expect(findClient.email).toEqual(client.email);
    expect(findClient.address).toEqual(client.address);
    expect(findClient.createdAt).toEqual(client.createdAt);
    expect(findClient.updatedAt).toEqual(client.updatedAt);
  });

  it("should find a client", async () => {
    const client = await ClientModel.create({
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      address: "Address 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const repository = new ClientRepository();
    const result = await repository.find(client.id);

    expect(result.id.id).toEqual(client.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.address).toEqual(client.address);
    expect(result.createdAt).toEqual(client.createdAt);
    expect(result.updatedAt).toEqual(client.updatedAt);
  });
});
