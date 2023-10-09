import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class EnviarConsoleLogWhenAddressIsChanged implements EventHandlerInterface {
  handle(event:CustomerAddressChangedEvent):void{
    console.log('Endereço do cliente id ' + event.eventData.id +' '+ event.eventData.name + ' alterado para ' +event.eventData.endereco);
  }
}