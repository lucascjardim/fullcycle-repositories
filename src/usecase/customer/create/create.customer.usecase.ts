import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import customerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from "./create.customer.dto";

export default class CreateCustomerUseCase {
  private customerRepository: customerRepositoryInterface;
  constructor(customerRepository: customerRepositoryInterface){
    this.customerRepository = customerRepository;
  }

  async execute(input: InputCreateCustomerDTO): Promise<OutputCreateCustomerDTO>{
    const customer = CustomerFactory.createWithAddress(
      input.name,
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city,
      )
    );

    await this.customerRepository.create(customer);
    return {
      id:customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        zip: customer.Address.zip,
        city: customer.Address.city,
      },
    };
  }
}