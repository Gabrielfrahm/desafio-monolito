import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ClientGateway from "../../gateway/client-gateway";
import {
  FindClientInputDto,
  FindClientOutPutDto,
} from "./find-client.usecase.dto";

export default class FindClientUseCase implements UseCaseInterface {
  constructor(private _clientRepository: ClientGateway) {
    this._clientRepository = _clientRepository;
  }
  async execute(input: FindClientInputDto): Promise<FindClientOutPutDto> {
    const client = await this._clientRepository.find(input.id);

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
