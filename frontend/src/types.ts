export interface CollectionItem {
id: number,
title: string,
image_url: string,
price?: number,
currency?: string,
category: string,
}

export interface CollectionProps {
    favorites: Set<number>,
    toggleFavorites: (id: number) => void,
}

export interface WishlistProps {
    favorites: Set<number>,
}