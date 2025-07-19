export interface PageParam {
    pageNumber: number;
};

export interface ContactParam {
    name: string,
    email: string,
    comments: string,
    subscribe: string,
    anime: boolean,
    arts: boolean,
    judo: boolean,
    lang: boolean,
    sci: boolean,
    travel: boolean,
    hear: string,
};

export interface ImageIdRouteParam {
    id: string;
};

export interface UserSchema {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

export interface ImageMetadata {
    image_id: number,
    filename: string,
    caption: string,
    price: number,
    details: string,
};