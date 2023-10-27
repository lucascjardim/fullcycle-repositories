import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import CreateProductUseCase from "../create/create.product.usecase";

describe("Test integration update product use case", () => {
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

  
it("should update a product use case", async() => {
    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);
    const updateProductUseCase = new UpdateProductUseCase(productRepository);
    const input = {
      type:"a",
      name: "Product 01",
      price:100,
    }
    const productCreated = await createProductUseCase.execute(input);
    const productUpdated = {
      id: productCreated.id,
      name: "ProductUpdated",
      price: 1000,
    }
    const outputUpdated = await updateProductUseCase.execute(productUpdated);
    expect(outputUpdated).toEqual({
        id: productUpdated.id,
        name: productUpdated.name,
        price: productUpdated.price,
      });  
  });
});

