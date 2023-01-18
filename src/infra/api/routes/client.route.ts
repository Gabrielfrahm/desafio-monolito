import express, { Request, Response } from "express";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";

const clientRouter = express.Router();

clientRouter.post("/", async (req: Request, res: Response) => {
  const clientFacade = ClientAdmFacadeFactory.create();
  try {
    const clientAdmDTO = {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
    };
    const client = await clientFacade.add(clientAdmDTO);
    res.send(client).status(200);
  } catch (err) {
    res.status(500).send(err);
  }
});

clientRouter.get("/:id", async (req: Request, res: Response) => {
  const clientFacade = ClientAdmFacadeFactory.create();
  try {
    const clientAdmDTO = {
      id: req.params.id,
    };
    const client = await clientFacade.find(clientAdmDTO);
    res.send(client).status(200);
  } catch (err) {
    res.status(500).send(err);
  }
});

export { clientRouter };
