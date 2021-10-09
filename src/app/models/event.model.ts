export interface Event {

    events: events[],
    total: number, 
    total_pages:number
}


export interface Organizer {
    id: number, 
    organizer: string, 
    phone: string, 
    email: string
}

export interface events {
    id: number
    description: string
    excerpt: string 
    slug: string, 
    image: {
        url:string, 
        sizes: {
            medium: {
                width: number, 
                height: number, 
                url: string
            }, 
            large:{
                width: number, 
                height: number, 
                url: string

            }, 
            thumbnail: {
                width: number, 
                height: number, 
                url: string
            }
            medium_large: {
                width: number, 
                height: number, 
                url: string
            }
        }
    }
    start_date: Date
    start_date_details: {
        year: string, 
        month: string, 
        day: string
    }
    end_date: Date
    end_date_details: {
        year: string, 
        month: string, 
        day: string
    }
    cost: string
    cost_details: {
        values: any
    }
    venue: {
        id: number,
        venue: string, 
        city: string, 
        country: string, 
        phone: string
    }
    organizer: Organizer[],
}