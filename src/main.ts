import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

let costumer = new Customer("123","Lucas Jardim");
let address = new Address("Rua oeste", 43, "29830000","ES");
costumer.Address = address;
costumer.activate();

//const item1 = new OrderItem("1","item01",10);
//const item2 = new OrderItem("2","item02",15);

//const order = new Order("1", "123", [item1, item2]);