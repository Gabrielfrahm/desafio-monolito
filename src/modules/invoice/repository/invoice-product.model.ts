import {
  Model,
  Table,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import InvoiceModel from "./invoice.mode";
import ProductModel from "./product.model";

@Table({
  tableName: "invoice_products",
  timestamps: false,
})
export default class InvoicesProductsModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @ForeignKey(() => ProductModel)
  @Column({ allowNull: false })
  product_id: string;

  @BelongsTo(() => ProductModel)
  product: ProductModel;

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false })
  invoice_id: string;

  @BelongsTo(() => InvoiceModel, {
    onDelete: "CASCADE",
  })
  invoice: InvoiceModel;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;
}
