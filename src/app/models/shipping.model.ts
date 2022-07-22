export interface ShippingZones{
    name: string , 
    id: number , 
    order: number

}

export interface ShippingZonesMethod{
    id: number , 
    title:string, 
    method_title: string
    enabled: boolean, 
    settings: {
        cost: {
        value: string,
        }
    }
}