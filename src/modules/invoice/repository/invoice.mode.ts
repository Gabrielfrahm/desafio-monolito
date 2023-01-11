import {
  Model,
  Table,
  PrimaryKey,
  Column,
  HasMany,
} from "sequelize-typescript";
import InvoicesProductsModel from "./invoice-product.model";

@Table({
  tableName: "invoices",
  timestamps: false,
})
export default class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  document: string;

  @Column({ allowNull: false })
  street: string;

  @Column({ allowNull: false })
  number: string;

  @Column({ allowNull: false })
  zipcode: string;

  @Column({ allowNull: false })
  city: string;

  @Column({ allowNull: false })
  complement: string;

  @Column({ allowNull: false })
  state: string;

  @HasMany(() => InvoicesProductsModel, {
    onDelete: "CASCADE",
  })
  declare items: InvoicesProductsModel[];

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;
}
