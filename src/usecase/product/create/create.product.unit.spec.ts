import CreateProductUseCase from "./create.product.usecase";

const input = {
  type:"a",
  name:"Product 01",
  price: 150, 
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test product", () => {
  it("Should be create a product", async() => {
    const productRepository = MockRepository();
    
    const createProductUseCase = new CreateProductUseCase(productRepository);
    const output = await createProductUseCase.execute(input);
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should throw an error when name is missing", async() => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);
    input.name = ""
    await expect(createProductUseCase.execute(input)).rejects.toThrow("Name product is required");
  });

  it("should throw an error when price is less than 0", async() => {
    const productRepository = MockRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);
    input.price = -15
    input.name = "Product 01"
    await expect(createProductUseCase.execute(input)).rejects.toThrow("price must be greater than zero");
  });

});