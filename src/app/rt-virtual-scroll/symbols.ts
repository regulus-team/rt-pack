export interface BreedList {
    current_page: number;
    data: Breed[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: BreedListLinks[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}

export interface Breed {
    breed: string;
    country: string;
    origin: string;
    coat: string;
    pattern: string;
}

export interface BreedListLinks {
    url: string;
    label: string;
    active: boolean;
}

