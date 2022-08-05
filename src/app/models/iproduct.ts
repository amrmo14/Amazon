export interface Iproduct {
    en?:{
        name?: string,
        Description?:string,
        Brand?:string,
    },
    ar?:{
        name?: string,
        Description?:string,
        Brand?:string,
    },
    id: number,
    Price:number ,
    Quantity: number,
    imgs?: [],
    CateogryID: Number,
    itemTotalprice?:Number,
    count?:Number,
    Seller?:string,
    ShipsFrom?:string,
    Discount?:number,
}
