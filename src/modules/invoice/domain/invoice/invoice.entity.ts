import AggregateRoot from "../../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../../@shared/domain/entity/base.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../product/product.entity";
import Address from "../../value-object/address.entity";

export type InvoiceProps = {
  id?: Id; // criado automaticamente
  name: string;
  document: string;
  address: Address; // value object
  items: Product[]; // Product entity
  createdAt?: Date; // criada automaticamente
  updatedAt?: Date; // criada automaticamente
};

export default class Invoice extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _document: string;
  private _address: Address;
  private _items: Product[];
  private _total: number;

  constructor(props: InvoiceProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._document = props.document;
    this._address = props.address;
    this._items = props.items;
    this._total = this.itemTotal();
  }

  get name(): string {
    return this._name;
  }

  get document(): string {
    return this._document;
  }

  get address(): Address {
    return this._address;
  }

  get items(): Product[] {
    return this._items;
  }

  get total(): number {
    return this._total;
  }

  itemTotal(): number {
    return this.items.reduce((acc, item) => acc + item.price, 0);
  }
}
