export interface CollectionItem {
id: number,
title: string,
image_url: string,
price?: number,
currency?: string,
category: string,
medium?: string}

export interface CollectionProps {
    collection: CollectionItem[],
    favorites: Set<number>,
    toggleFavorites: (id: number) => void,
    loading: boolean
}

export interface WishlistProps {
    collection: CollectionItem[],
    favorites: Set<number>,
    onRemove: (id: number) => void,
}

export interface ItemProps {
    favorites: Set<number>,
    toggleFavorites: (id: number) => void,
}