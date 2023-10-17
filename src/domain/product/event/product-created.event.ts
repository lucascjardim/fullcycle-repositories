import EventInterface from "../../@shared/event/event.interface";

export default class ProductCreatedEvent implements EventInterface{
  dataTimeCorurred: Date;
  eventData: any;
  
  constructor(eventData: any){
    this.dataTimeCorurred = new Date();
    this.eventData = eventData
  }
}