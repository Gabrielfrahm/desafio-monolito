import BaseEntity from "../../@shared/domain/entity/base.entity";

export type AddressProps = {
  street: string;
  number: string;
  city: string;
  zipCode: string;
  state: string;
  complement: string;
};

export default class Address extends BaseEntity {
  private _street: string;
  private _number: string;
  private _city: string;
  private _zipCode: string;
  private _complement: string;
  private _state: string;

  constructor(props: AddressProps) {
    super();
    this._street = props.street;
    this._number = props.number;
    this._city = props.city;
    this._zipCode = props.zipCode;
    this._complement = props.complement;
    this._state = props.state;
  }

  get street(): string {
    return this._street;
  }

  get number(): string {
    return this._number;
  }

  get zipCode(): string {
    return this._zipCode;
  }

  get city(): string {
    return this._city;
  }

  get complement(): string {
    return this._complement;
  }

  get state(): string {
    return this._state;
  }
}
