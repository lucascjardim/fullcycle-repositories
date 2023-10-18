import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {

  it("should create a customer", () => {
    let customer = CustomerFactory.create("Jhon");
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Jhon");
    expect(customer.Address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const address = new Address("Street", 15, "29830-000", "Nova Venecia");
    let customer = CustomerFactory.createWithAddress("Jhon", address);
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Jhon");
    expect(customer.Address).toBe(address);
  });


});