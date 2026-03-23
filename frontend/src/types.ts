export interface CollectionItem {
id: number,
title: string,
image_url: string,
price?: number,
currency?: string,
category: string,
}

export interface CollectionProps {
    collection: CollectionItem[],
    favorites: Set<number>,
    toggleFavorites: (id: number) => void,
    loading: boolean
}

export interface WishlistProps {
    collection: CollectionItem[],
    favorites: Set<number>,
}