export interface CareFoci{
    id:          number;
    created_at:  Date;
    updated_at:  Date;
    name:        string;
    is_active:   boolean;
    description: string;
    items:       Item[];
}

export interface Item {
    id:           number;
    created_at:   Date;
    updated_at:   Date;
    care_foci_id: number;
    name:         string;
    min:          number;
    max:          number;
    description:  string;
}
