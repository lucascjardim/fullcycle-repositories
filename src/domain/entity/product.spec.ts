import Product from "./product";

describe("Product unit test", () => {
  it("should throw error when id product is empty", () => { 
    expect(() => {
      const product = new Product("","Product 1",100)
    }).toThrowError("Id product is required");
  });

  it("should throw error when name product is empty", () => { 
    expect(() => {
      const product = new Product("1020","",100)
    }).toThrowError("Name product is required");
  });

  it("should throw error when price is less than zero", () => { 
    expect(() => {
      const product = new Product("1020","produto x",-1)
    }).toThrowError("price must be greater than zero");
  });

  it("should change name product", () => { 
    const product = new Product("1020","produto x",100);
    product.changeName("Produto 02");
    expect(product.name).toBe("Produto 02");
  });

  it("should change price product", () => { 
    const product = new Product("1020","produto x",100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});