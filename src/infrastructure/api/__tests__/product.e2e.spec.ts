import { sequelize, app } from "../express"
import request from "supertest"

describe("E2E test for product", () => {
  beforeEach(async () => { await sequelize.sync({ force:true })});
  afterAll(async () => { await sequelize.close(); });
  it("should be create a product", async() => {
    const response = await request(app)
    .post("/product")
    .send({
      type: "a",
      name: "Product 01",
      price: 100
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product 01");
    expect(response.body.price).toBe(100);
  });

  it("should be list all products", async() => {
    const response = await request(app)
    .post("/product")
    .send({
      type: "a",
      name: "Product one",
      price: 100
    });
    expect(response.status).toBe(200);
    
    const response02 = await request(app)
    .post("/product")
    .send({
      type: "a",
      name: "Product two",
      price: 200
    });
    expect(response02.status).toBe(200);
    

    const responseAllProducts = await request(app)
    .get("/product")
    .send()
    expect(responseAllProducts.status).toBe(200);
    expect(responseAllProducts.body.products.length).toBe(2)
    const product = responseAllProducts.body.products[0];
    expect(product.name).toBe("Product one");
    expect(product.price).toBe(100);
    
    const product2 = responseAllProducts.body.products[1];
    expect(product2.name).toBe("Product two");
    expect(product2.price).toBe(200);
    
  });
});