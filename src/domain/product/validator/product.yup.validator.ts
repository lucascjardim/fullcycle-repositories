import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import * as yup from "yup";

export default class ProductYupValidator implements ValidatorInterface<Product>{
  validate(entity:Product):void {

    try{
      yup.object().shape({
        id:yup.string().required("Id product is required"),
        name:yup.string().required("Name product is required"),
        price: yup.number().moreThan(0, "price must be greater than zero").required("price must be greater than zero")
      })
      .validateSync({
        id:entity.id,
        name:entity.name,
        price:entity.price,
      },{
        abortEarly:false,
      });

    }catch(errors){
      const e = errors as yup.ValidationError;
      e.errors.forEach((erro) => {
        entity.notification.addError({ context: "product", message: erro });
      });
    }
  }
}