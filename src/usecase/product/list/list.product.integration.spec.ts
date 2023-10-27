import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

describe("Test integration list products use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });


  it("should find a product use case", async() => {
    const productRepository = new ProductRepository();
    const listProductUseCase = new ListProductUseCase(productRepository);
    
    const product = new Product("123", "Product 01", 150);
    const product02 = new Product("456", "Product 02", 250);
    await productRepository.create(product);
    await productRepository.create(product02);

    
    const result = await listProductUseCase.execute({});
    
    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe(product.id);
    expect(result.products[0].name).toBe(product.name);
    expect(result.products[0].price).toBe(product.price);

    expect(result.products[1].id).toBe(product02.id);
    expect(result.products[1].name).toBe(product02.name);
    expect(result.products[1].price).toBe(product02.price);

  });
})