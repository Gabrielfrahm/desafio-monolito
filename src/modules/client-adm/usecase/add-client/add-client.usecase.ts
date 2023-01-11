import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client-gateway";
import {
  AddClientInputDto,
  AddClientOutPutDto,
} from "./add-client.usecase.dto";

export default class AddClientUseCase implements UseCaseInterface {
  constructor(private _clientRepository: ClientGateway) {
    this._clientRepository = _clientRepository;
  }

  async execute(input: AddClientInputDto): Promise<AddClientOutPutDto> {
    const props = {
      id: new Id(input.id) || new Id(),
      name: input.name,
      email: input.email,
      address: input.address,
    };

    const client = new Client(props);
    this._clientRepository.add(client);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}
