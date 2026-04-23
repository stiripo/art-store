export interface CollectionItem {
id: number,
title: string,
image_url: string,
price?: number,
currency?: string,
category: string,
medium?: string
};

export interface FilterFormProps {
    categories: string[],
    filterCategory: string,
    onFilterChange: (category: string) => void,
}

export type FavoritesContextType = {
  favorites: Set<number>;
  toggleFavorites: (id: number) => void;
};

export type CollectionContextType = {
    collection: CollectionItem[],
    loading: boolean,
}