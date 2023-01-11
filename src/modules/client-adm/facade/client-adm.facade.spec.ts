import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacade from "./client-adm.facade";

describe("Client adm facade test", () => {
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
    const repository = new ClientRepository();
    const addUseCase = new AddClientUseCase(repository);
    const facade = new ClientAdmFacade({
      findUseCase: undefined,
      addUSeCase: addUseCase,
    });

    const input = {
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      address: "Address 1",
    };

    await facade.add(input);

    const findClient = await ClientModel.findOne({
      where: { id: input.id },
    });

    expect(findClient).toBeDefined();

    expect(findClient.name).toEqual(input.name);
    expect(findClient.email).toEqual(input.email);
    expect(findClient.address).toEqual(input.address);
  });

  it("should find a client", async () => {
    const repository = new ClientRepository();
    const findUseCase = new FindClientUseCase(repository);
    const addUseCase = new AddClientUseCase(repository);

    const facade = new ClientAdmFacade({
      findUseCase: findUseCase,
      addUSeCase: addUseCase,
    });
    const input = {
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      address: "Address 1",
    };

    await facade.add(input);

    const client = await facade.find({ id: "1" });
    expect(client).toBeDefined();

    expect(client.id).toEqual(input.id);
    expect(client.name).toEqual(input.name);
    expect(client.email).toEqual(input.email);
    expect(client.address).toEqual(input.address);
  });
});
