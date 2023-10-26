export interface inputFindCustomerDTO {
  id:string;
}

export interface outputFindCustomerDTO{
  id:string;
  name: string;
  address:{
    street: string;
    city: string;
    number:number;
    zip: string;
  };
}