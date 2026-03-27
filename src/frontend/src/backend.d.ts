import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MenuItem {
    id: bigint;
    name: string;
    description: string;
    category: Category;
    isVeg: boolean;
    price: bigint;
}
export enum Category {
    mains = "mains",
    desserts = "desserts",
    starters = "starters",
    snacks = "snacks",
    drinks = "drinks"
}
export interface backendInterface {
    addMenuItem(item: MenuItem): Promise<bigint>;
    getAllItems(): Promise<Array<MenuItem>>;
    getItemsByCategory(category: Category): Promise<Array<MenuItem>>;
    getMenuItem(id: bigint): Promise<MenuItem>;
    searchByName(searchTerm: string): Promise<Array<MenuItem>>;
}
