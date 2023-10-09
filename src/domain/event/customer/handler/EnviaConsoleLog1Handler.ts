import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedInterface from "../customer-created.event";

export default class EnviaConsoleLog01WhenCustomerIsCreated implements EventHandlerInterface {
  handle(event: CustomerCreatedInterface):void{
    console.log("Esse é o primeiro console.log do evento: CustomerCreated");
  }
}