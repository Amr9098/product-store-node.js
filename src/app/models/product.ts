export interface Product {
  pro_id: number;
  name: string;
  description: string;
  photo: string;
  sel_id: number;
  price:number;
  sel_name:string;
}


export interface addProduct {
  pro_id: number;

}
export interface Iorders {
  order_id:    number;
  seller_name: string;
  pro_id:      number;
  name:        string;
  description: string;
  photo:       string;
  sel_id:      number;
  price:       number;
  status: string;
}
export interface conorder {
  order_id:      number;
  customer_name: string;
  customer_id:   number;
  pro_id:        number;
  name:          string;
  description:   string;
  photo:         string;
  sel_id:        number;
  price:         number;
  status: string;

}
