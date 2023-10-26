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
    /*
    const createProductUseCase = new CreateProductUseCase(productRepository);
    const output = await createProductUseCase.execute(input);
    expect(output).toEqual({
      id: expect.any(String),
      type:input.type,
      name: input.name,
      price: input.price,
    });
    */
  });
});