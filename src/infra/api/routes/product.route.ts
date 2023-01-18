import express, { Request, Response } from "express";

import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/product-adm.factory";

const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const productFacade = ProductAdmFacadeFactory.create();

  try {
    const productDto = {
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      stock: req.body.stock,
    };

    const product = await productFacade.addProduct(productDto);
    res.send(product).status(200);
  } catch (err) {
    res.status(500).send(err);
  }
});

productRoute.get("/:id", async (req: Request, res: Response) => {
  const productFacade = ProductAdmFacadeFactory.create();
  try {
    const productDto = {
      productId: req.params.id,
    };

    const product = await productFacade.checkStock(productDto);
    res.send(product).status(200);
  } catch (err) {
    res.status(500).send(err);
  }
});

export { productRoute };
