import Product from "../../../domain/product/entity/product"
import FindProductUseCase from "./find.product.usecase";


const product = new Product("123","Product A", 100);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test find product use case", () => {
  it("should be find a product", async() => {
    const productRepository = MockRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);

    const product = new Product("123", "Product A", 100);
    await productRepository.create(product);
    const input = { id: "123" }
    const output = {
      id: "123",
      name: "Product A",
      price: 100,
    }

    const result = await findProductUseCase.execute(input);
    expect(result).toEqual(output);
  });

  it("should NOT find a product", async() => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    
    const findProductUseCase = new FindProductUseCase(productRepository);
    const input = { id: "123" };  
    expect(() => {
      return findProductUseCase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});