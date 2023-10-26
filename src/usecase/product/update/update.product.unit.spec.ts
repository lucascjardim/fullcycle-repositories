import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "Product A", 100);
const input = {
  id:product.id,
  name: "Updated Product",
  price: 200,
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  }
}


describe("unit test for product update usecase", () => {
  it("should update a product", async() => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);
    const output = await productUpdateUseCase.execute(input);
    expect(output).toEqual(input);
  });
})