import EventInterface from "../@shared/event.interface";

export default class CustomerCreatedEvent implements EventInterface{
  dataTimeCorurred: Date;
  eventData: any;
  
  constructor(eventData: any){
    this.dataTimeCorurred = new Date();
    this.eventData = eventData
  }
}