import { Category } from "./category.model";

export interface Product {

    
    id: number
    name: string
    slug: string 
    permalink: string
    description:string
    short_description: string
    price: number
    regular_price: number 
    sale_price: number 
    quantity: number
    categories: Category[] 
    images:any[]
    related_ids: any[]
    
    

}