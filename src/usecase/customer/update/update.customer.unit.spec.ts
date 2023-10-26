import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress("Jhon",
  new Address("Street", 123, "Zip", "City")
);

const input = {
  id:customer.id,
  name: "Jhon Updated",
  address: {
    street: "Street Updated",
    number: 1234,
    zip: "Zip Updated",
    city: "City Updated"
  },
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn(),
  }
}

describe("unit test for customer update usecase", () => {

  it("should update a customer", async() => {
    const customerRepository = MockRepository();
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);
    const output = await customerUpdateUseCase.execute(input);
    expect(output).toEqual(input);
  });
})