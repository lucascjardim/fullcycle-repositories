import { Sequelize } from "sequelize-typescript";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import Product from "../../../../domain/product/entity/product";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Order from "../../../../domain/checkout/entity/order";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    productRepository.create(product);

    const orderItem = new OrderItem(
      "10",
      product.name,
      product.price,
      product.id,
      2
    );
    const order = new Order("123", "123",[orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
   
    const orderModel = await OrderModel.findOne({
      where: { id:order.id },
      include:["items"],
    });
    
    
    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items:
      [{
          id: orderItem.id, 
          name: orderItem.name, 
          price: orderItem.price, 
          quantity: orderItem.quantity, 
          order_id: "123",
          product_id: "123"
      }]
    });
  })

  it("Should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    productRepository.create(product);

    const orderItem = new OrderItem(
      "10",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123",[orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id:order.id },
      include:["items"],
    });

    const orderTeste = await orderRepository.find("123")
    expect(orderModel.toJSON()).toStrictEqual({
      id: orderTeste.id,
      customer_id: orderTeste.customerId,
      total: orderTeste.total(),
      items:
      [{
          id: orderTeste.items[0].id, 
          name: orderTeste.items[0].name, 
          price: orderTeste.items[0].price, 
          quantity: orderTeste.items[0].quantity, 
          order_id: "123",
          product_id: "123"
      }]
    });
  });

  it("Should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const customer2 = new Customer("122", "Customer 2");
    const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
    customer2.changeAddress(address2);
    await customerRepository.create(customer2);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    productRepository.create(product);

    const product2 = new Product("122", "Product 2", 15);
    productRepository.create(product2);

    const orderItem = new OrderItem(
      "10",
      product.name,
      product.price,
      product.id,
      2
    );

    const orderItem2 = new OrderItem(
      "12",
      product2.name,
      product2.price,
      product2.id,
      2
    );
    const order = new Order("123", "123",[orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    const order2 = new Order("100", "122",[orderItem2]);
    await orderRepository.create(order2);
    let orders = await orderRepository.findAll();
    expect(orders).toHaveLength(2);
  });

  it("Should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    productRepository.create(product);

    const orderItem = new OrderItem(
      "10",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123",[orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id:order.id },
      include:["items"],
    });

    const orderTeste = await orderRepository.find("123")
    expect(orderModel.toJSON()).toStrictEqual({
      id: orderTeste.id,
      customer_id: orderTeste.customerId,
      total: orderTeste.total(),
      items:
      [{
          id: orderTeste.items[0].id, 
          name: orderTeste.items[0].name, 
          price: orderTeste.items[0].price, 
          quantity: orderTeste.items[0].quantity, 
          order_id: "123",
          product_id: "123"
      }]
    });

    const customer2 = new Customer("100", "Customer updated");
    const address2 = new Address("Street updated", 100, "Zipcode 100", "City 100");
    customer2.changeAddress(address2);
    await customerRepository.create(customer2);

    const orderUpdated = new  Order("123", "100",[orderItem]);
    await orderRepository.update(orderUpdated);
    const orderModelUpdated = await OrderModel.findOne({
      where: { id:"123" },
      include:["items"],
    });

    const orderTesteUpd = await orderRepository.find("123")
    expect(orderModelUpdated.toJSON()).toStrictEqual({
      id: orderTesteUpd.id,
      customer_id: orderTesteUpd.customerId,
      total: orderTesteUpd.total(),
      items:
      [{
          id: orderTesteUpd.items[0].id, 
          name: orderTesteUpd.items[0].name, 
          price: orderTesteUpd.items[0].price, 
          quantity: orderTesteUpd.items[0].quantity, 
          order_id: "123",
          product_id: "123"
      }]
    });
  });

});
