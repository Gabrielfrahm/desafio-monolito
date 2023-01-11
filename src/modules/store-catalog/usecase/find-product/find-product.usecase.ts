import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindProductInputDto, FindProductOutPutDto } from "./find-product.dto";

export default class FindProductUseCase implements UseCaseInterface {
  constructor(private _productRepository: ProductGateway) {
    this._productRepository = _productRepository;
  }

  async execute(input: FindProductInputDto): Promise<FindProductOutPutDto> {
    const product = await this._productRepository.find(input.id);
    return {
      id: product.id.id,
      description: product.description,
      name: product.name,
      salesPrice: product.salesPrice,
    };
  }
}
