import EnviaConsoleLog01WhenCustomerIsCreated from "../customer/handler/EnviaConsoleLog1Handler";
import EnviaConsoleLog02WhenCustomerIsCreated from "../customer/handler/EnviaConsoleLog2Handler";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import CustomerCreatedEvent from "../customer/customer-created.event";
import EventDispatcher from "./event-dispatcher";
import CustomerAddressChangedEvent from "../customer/customer-address-changed.event";
import EnviarConsoleLogWhenAddressIsChanged from "../customer/handler/EnviarConsoleLogWhenAddressIsChanged";

describe("Domain events tests",() => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    
    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
  });

  it("should unregister all event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
  });

  it("should notify all event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 01",
      description: "Product 01 description",
      price: 10.0,
    });
    //quando o notivy for executado, o sendEmailWhenProductIsCreatedHandler deve ser chamado
    eventDispatcher.notify(productCreatedEvent);
    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should be notify events on customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLog01WhenCustomerIsCreated();
    const eventHandler02 = new EnviaConsoleLog02WhenCustomerIsCreated();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler02);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler02);
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const spyEventHandler02 = jest.spyOn(eventHandler02, "handle");
    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "150",
      name: "Lucas Jardim",
      endereco: "Rua Oeste, 53 centro Nova Venécia"
    });
    //quando o notivy for executado, o sendEmailWhenProductIsCreatedHandler deve ser chamado
    eventDispatcher.notify(customerCreatedEvent);
    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventHandler02).toHaveBeenCalled();
  });

  it("should be notify event when address is changed", () => {
    const eventDispatcher = new EventDispatcher();
    const customerAddressChanged = new CustomerAddressChangedEvent({
      id: "150",
      name: "Lucas Jardim",
      endereco: "Rua Alterada, 53 centro Nova Venécia"
    });
    const eventHandler = new EnviarConsoleLogWhenAddressIsChanged();
    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler);
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    eventDispatcher.notify(customerAddressChanged);
    expect(spyEventHandler).toHaveBeenCalled();
  });
  
});