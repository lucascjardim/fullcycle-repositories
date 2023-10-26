import Product from "../../../domain/product/entity/product";
import productRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDTO, OutputListProductDTO } from "./list.product.dto";

export default class ListProductUseCase {
  private productRepository: productRepositoryInterface;
  constructor(productRepository:productRepositoryInterface){
    this.productRepository = productRepository;
  }

  async execute(input:InputListProductDTO): Promise<OutputListProductDTO>{
    const products = await this.productRepository.findAll();
    return OutputMapper.toOutput(products);
  }
}

class OutputMapper {
  static toOutput(product:Product[]):OutputListProductDTO{
    return {
      products: product.map((product) => ({
        id:product.id,
        name:product.name,
        price:product.price,
      })),
    };
  }
}