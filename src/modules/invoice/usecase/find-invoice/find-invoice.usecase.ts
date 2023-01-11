import UseCaseInterface from "../../../@shared/usecase/usecase.interface";

import InvoiceGateway from "../../gateway/invoice.gateway";
import Address from "../../value-object/address.entity";
import {
  FindInvoiceUseCaseInputDto,
  FindInvoiceUseCaseOutPutDto,
} from "./find-invoice.dto";

export default class FindInvoiceUseCase implements UseCaseInterface {
  constructor(private _invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = _invoiceRepository;
  }

  async execute(
    input: FindInvoiceUseCaseInputDto
  ): Promise<FindInvoiceUseCaseOutPutDto> {
    const invoice = await this._invoiceRepository.find(input.id);

    const totalPrice = invoice.items.reduce(
      (acc, current) => acc + current.price,
      0
    );

    return {
      id: invoice.id.id,
      name: invoice.name,
      address: new Address({
        street: invoice.address.street,
        city: invoice.address.city,
        number: invoice.address.number,
        zipCode: invoice.address.zipCode,
        complement: invoice.address.complement,
        state: invoice.address.state,
      }),
      document: invoice.document,
      items: invoice.items.map((item) => {
        return {
          id: item.id.id,
          name: item.name,
          price: item.price,
        };
      }),
      total: totalPrice,
      createdAt: invoice.createdAt,
    };
  }
}
