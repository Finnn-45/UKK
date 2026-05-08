export type Menu = {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
    category?: string;
    rating?: number;
    color?: string;
    createdAt?: Date;
    updatedAt?: Date;
};