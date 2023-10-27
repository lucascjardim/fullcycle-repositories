import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Test integration create product use case", () => {
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

  
it("should create a product use case", async() => {
  const productRepository = new ProductRepository();
  const createProductUseCase = new CreateProductUseCase(productRepository);
  const input = {
    type:"a",
    name: "Product 01",
    price:100,
  }
  const output = await createProductUseCase.execute(input);
  expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });
});

