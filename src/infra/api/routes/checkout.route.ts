import express, { Request, Response } from "express";
import PlaceOrderUseCase from "../../../modules/checkout/usecase/place-order/place-order.usecase";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/facade.factory";
import PaymentFacadeFactory from "../../../modules/payment/factory/payment.facade.factory";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/product-adm.factory";
import StoreCatalogFacadeFactory from "../../../modules/store-catalog/factory/facade.factory";

const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
  const clientFacade = ClientAdmFacadeFactory.create();
  const productAdmFacade = ProductAdmFacadeFactory.create();
  const catalogFacade = StoreCatalogFacadeFactory.create();
  const invoiceFacade = InvoiceFacadeFactory.create();
  const payment = PaymentFacadeFactory.create();
  const usaCase = new PlaceOrderUseCase(
    clientFacade,
    productAdmFacade,
    catalogFacade,
    null,
    invoiceFacade,
    payment
  );

  try {
    const checkoutDto = {
      clientId: req.body.clientId,
      products: req.body.products,
    };

    const outPut = await usaCase.execute(checkoutDto);
    res.send(outPut).status(200);
  } catch (err) {
    res.send(err).status(500);
  }
});

export { checkoutRoute };
