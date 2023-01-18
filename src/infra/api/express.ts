import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import { checkoutRoute } from "./routes/checkout.route";
import { clientRouter } from "./routes/client.route";
import { productRoute } from "./routes/product.route";

const app: Express = express();

app.use(express.json());
app.use("/client", clientRouter);
app.use("/product", productRoute);
app.use("/checkout", checkoutRoute);

let sequelize: Sequelize;

async function setupDatabase() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });

  sequelize.addModels([ProductModel, ClientModel]);
  await sequelize.sync();
}

setupDatabase();

export { app, sequelize };
