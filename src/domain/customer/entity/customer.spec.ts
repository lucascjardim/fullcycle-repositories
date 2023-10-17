import Address from "../value-object/address";
import Customer from "./customer"

describe("Costumer unit test", () => {
  it("should throw error when id is empty", () => { 
    expect(() => {
      let customer = new Customer("","Jhon");
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => { 
    expect(() => {
      let customer = new Customer("123","");
    }).toThrowError("Name is required");
  });

  it("should change name", () => { 
    const customer = new Customer("123","John");
    customer.changeName("Jane");
    expect(customer.name).toBe("Jane");
  });

  it("should activate costumer", () => { 
    const customer = new Customer("1","Costumer 01");
    const address = new Address("Rua A",123,"29830-000", "New Venecy");
    customer.Address = address;
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it("should desactivate costumer", () => { 
    const customer = new Customer("1","Costumer 01");
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it("should throw error when address is undefined when activate a customer", () => {
    expect(() => {
      const customer = new Customer("1","Costumer 01");
      customer.activate()
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("Should add reward points", () => {
    const customer = new Customer("1", "Customer 01");
    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });


});