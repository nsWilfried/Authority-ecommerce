export interface Order {
    id?: number
    billing: Billing
    shipping: Billing
    payment_method:string 
    payment_method_title: string 
    set_paid: boolean
    line_items: lineItems[]
    shipping_lines:shippingLines[]
    customer_id: number | undefined
    customer_note:string
    coupon_lines?: [
        {
            code?:string
        }
    ]
    

}

export interface Billing {
    first_name: string 
    last_name:string 
    address_1?: string
    city: string
    country: string
    phone: string
    email: string
}

export interface lineItems {
    product_id: number 
    quantity: number
    price: number
}


export interface shippingLines {
    method_id: string 
    method_title: string 
    total: string
}