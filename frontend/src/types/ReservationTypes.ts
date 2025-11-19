export interface Court {
    id: string;
    name: string;
    court_type_id: string;
    court_type_name?: string;
    price?: number;
    img: string;
}

export interface Schedule {
    id: number;
    start_time: string;
    end_time: string;
    available: boolean;
}
