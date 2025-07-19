export interface PageParam {
    pageNumber: number;
};

export interface ContactParam {
    name: String,
    email: String,
    comments: String,
    subscribe: String,
    anime: Boolean,
    arts: Boolean,
    judo: Boolean,
    lang: Boolean,
    sci: Boolean,
    travel: Boolean,
    hear: String,
};

export interface ImageIdRouteParam {
    id: string;
};

export interface UserSchema {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
}

export interface ImageMetadata {
    image_id: Number,
    filename: String,
    caption: String,
    price: Number,
    details: String,
};