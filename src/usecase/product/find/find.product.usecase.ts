import productRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { inputFindProductDTO, outputFindProductDTO } from "./find.product.dto";

export default class FindProductUseCase{
  private productRepository:productRepositoryInterface;

  constructor(productRepository:productRepositoryInterface){
    this.productRepository = productRepository;
  }

  async execute(input: inputFindProductDTO): Promise<outputFindProductDTO> {
    const product = await this.productRepository.find(input.id);
    return {
      id: product.id,
      name:product.name,
      price: product.price,
    }
  }
}