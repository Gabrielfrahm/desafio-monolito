import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import { PlaceOrderInputDto, PlaceOrderOutPutDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {
  constructor() {}

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutPutDto> {
    return {
      id: "string",
      invoice_id: "string",
      status: "string",
      total: 0,
      products: [
        {
          productId: "1",
        },
      ],
    };
  }
}
