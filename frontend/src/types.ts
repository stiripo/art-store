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
    loading: boolean
}

export interface WishlistProps {
    collection: CollectionItem[],
    onRemove: (id: number) => void,
}

export type FavoritesContextType = {
  favorites: Set<number>;
  toggleFavorites: (id: number) => void;
};