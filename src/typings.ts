import {ReactNode} from "react";

export interface IUserContext {
    userId:string
}
export interface IUserProvider{
    userId:string,
    children:ReactNode
}




export  interface IProductCard {
    id: number;
    title: string;
    category: string;
    price: number;
    thumbnail: string;
    rating: number;
    description: string;
 }
 
 
 export interface IProductData {
    id: number;
    title: string;
    category: string;
    price: number;
    thumbnail: string;
    rating:number;
    description:string;
 
 
 }
 
 
 export interface IUserCart {
    id: number;
    title: string;
    category: string;
    price: number;
    thumbnail: string;
    rating:number;
    quantity:number;
 }
