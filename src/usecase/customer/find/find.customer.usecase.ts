import customerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { inputFindCustomerDTO, outputFindCustomerDTO } from "./find.customer.dto";

export default class FindCustomerUseCase {
  private customerRepository: customerRepositoryInterface;

  constructor(customerRepository: customerRepositoryInterface){
    this.customerRepository = customerRepository;
  }

  async execute(input: inputFindCustomerDTO):Promise<outputFindCustomerDTO> {
    const customer = await this.customerRepository.find(input.id);
    return {
      id:customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        city: customer.Address.city,
        number: customer.Address.number,
        zip: customer.Address.zip,
      },
    };
  }
}