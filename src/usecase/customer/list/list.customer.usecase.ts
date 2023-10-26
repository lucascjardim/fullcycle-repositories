import Customer from "../../../domain/customer/entity/customer";
import customerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputListCustomerDTO, OutputListCustomerDTO } from "./list.customer.dto";

export default class ListCustomerUseCase {
  private customerRepository: customerRepositoryInterface;
  constructor(CustomerRepository: customerRepositoryInterface) {
    this.customerRepository = CustomerRepository;
  }

  async execute(input:InputListCustomerDTO): Promise<OutputListCustomerDTO>{
    const customers = await this.customerRepository.findAll();
    return OutputMapper.toOutput(customers);
  }
}

class OutputMapper {
  static toOutput(customer:Customer[]):OutputListCustomerDTO{
    return {
      customers:customer.map((customer) => ({
        id:customer.id,
        name:customer.name,
        address:{
          street:customer.Address.street,
          number:customer.Address.number,
          zip:customer.Address.zip,
          city:customer.Address.city,
        },
      })),
    };
  }
}