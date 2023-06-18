import { Address } from "../address/address";
import { Product} from "../product/product";
import { Status } from "./status";

export class Order {

  id: string;
  trackingCode: string;
  status: Status;
  startingAddress: Address;
  targetAddress: Address;
  product : Product;
  dateCreated : Date;
  lastUpdated : Date;

  constructor(id : string, trackingCode : string,
              status : Status, startingAddress : Address,
              targetAddress : Address, product : Product,
              dateCreated : Date, lastUpdated : Date){

    this.id = id;
    this.trackingCode = trackingCode;
    this.status = status;
    this.startingAddress = startingAddress;
    this.targetAddress = targetAddress;
    this.product = product;
    this.dateCreated = dateCreated;
    this.lastUpdated = lastUpdated;
  }
}
