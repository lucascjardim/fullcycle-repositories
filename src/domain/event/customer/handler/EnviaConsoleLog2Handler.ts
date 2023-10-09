import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedInterface from "../customer-created.event";

export default class EnviaConsoleLog02WhenCustomerIsCreated implements EventHandlerInterface {
  handle(event: CustomerCreatedInterface):void{
    console.log("Esse é o segundo console.log do evento: CustomerCreated");
  }
}