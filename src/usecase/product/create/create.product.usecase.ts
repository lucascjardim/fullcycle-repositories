import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import productRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDTO, OutputCreateProductDTO } from "./create.product.dto";

export default class CreateProductUseCase {
  private productRepository: productRepositoryInterface;
  constructor(productRepository:productRepositoryInterface){
    this.productRepository = productRepository;
  }

  async execute(input:InputCreateProductDTO): Promise<OutputCreateProductDTO>{
    const product = ProductFactory.create(input.type, input.name, input.price);
    await this.productRepository.create(new Product(product.id, product.name, product.price))
    return {
      id: product.id,
      name:product.name,
      price:product.price,
    }
  }
}