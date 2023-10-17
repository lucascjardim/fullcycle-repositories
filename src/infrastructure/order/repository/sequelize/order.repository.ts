import Order from "../../../../domain/checkout/entity/order";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import orderRepositoryInterface from "../../../../domain/checkout/repository/oreder-repository.interface";
import OrderItem from "../../../../domain/checkout/entity/order_item";

export default class OrderRepository implements orderRepositoryInterface{
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id:entity.id,
      customer_id: entity.customerId,
      total: entity.total(),
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price:item.price,
        product_id: item.productId,
        quantity: item.quantity,
      })),
    },
    {
      include: [{model: OrderItemModel}],
    });
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price:item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
        include: [{model: OrderItemModel}],
      });
    } catch (error) {
      throw new Error("Order not found");
    }
     
    let items: OrderItem[] = [];
    orderModel.items.map(item => {
      const orderItem = new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
      items.push(orderItem);
    })
    const order = new Order(orderModel.id, orderModel.customer_id, items);
    return order;
  }

  async findAll(): Promise<Order[]> {
    let orderModel;
    try {
      orderModel = await OrderModel.findAll(
        {
        include: [{model: OrderItemModel}],
      });
    } catch (error) {
      throw new Error("Order not found");
    }
    let orders: Order[] = [];
    let items: OrderItem[] = [];
    orderModel.map(order => {
      order.items.map(item => {
        const orderItem = new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
        items.push(orderItem);
      });
      const newOrder = new Order(order.id, order.customer_id, items);
      orders.push(newOrder)
    })
    return orders
  }
}

