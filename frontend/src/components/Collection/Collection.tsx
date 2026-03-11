import { useState, useEffect, useMemo } from "react";
import type { CollectionItem } from "../../types";
import { FilterForm } from "../FilterForm/FilterForm";
import styles from "./Collection.module.scss";
import { Link } from "react-router-dom";
import { Heart } from 'lucide-react';

//TODO: apiResponse type
//TODO: paginated data

//TODO: more filters
//TODO: state management

//TODO: Item page

export function Collection() {

    const getFavoritesFromLocalStorage = (): number[] => {
        try {
            const stored = localStorage.getItem('favorites');
            if (!stored) return [];

            const parsed: unknown = JSON.parse(stored);

            if (
                Array.isArray(parsed) &&
                parsed.every(item => typeof item === 'number')
            ) {
                return parsed;
            }

            return [];
        } catch {
            return [];
        }
    }

    const [collection, setCollection] = useState<CollectionItem[]>([]);
    const [filterCategory, setFilterCategory] = useState<string>('All');
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState<Set<number>>(() => new Set(getFavoritesFromLocalStorage()));

    const handleFavorites = (id: number): void => {
        setFavorites(prev => {
            const updated = new Set(prev);
            if (updated.has(id)) {
                updated.delete(id);
            } else {
                updated.add(id);
            }
            return updated;
        });
    }

    const filteredCollection = useMemo(() => {
        if (filterCategory === "All") return collection;
        return collection.filter((item) => item.category === filterCategory);
    }, [collection, filterCategory]);

    const categories = useMemo(() => {
        return ['All', ...new Set(collection.map((item => item.category)))]
    }, [collection]
    )

    const fetchCollection = async (): Promise<void> => {
        try {
            const response = await fetch('http://localhost:8080/collection');
            if (!response.ok) {
                throw new Error('Error fetching data')
            }
            const data = await response.json() as CollectionItem[];
            setCollection(data);
        }
        catch (error) {
            console.error(error);
            console.log('Error fetching data')
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCollection();
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify([...favorites]));
    }, [favorites]);


    if (loading) return <div aria-busy="true">Loading...</div>;

    return (
        <>
            {collection.length === 0 ? (<div>No artworks yet</div>) : (

                <div>
                    <div className={styles.top}>
                        <div className={styles.controlArea}>
                            <FilterForm
                                categories={categories}
                                onFilterChange={setFilterCategory}
                                filterCategory={filterCategory} />
                        </div>
                        <h2 className={styles.headline}>Gallery</h2>
                    </div>

                    <div aria-live="polite" className={styles.showing}>
                        Showing {filteredCollection.length} artworks
                    </div>
                    <div>
                        <ul>
                            {filteredCollection.map(item => (
                                <li key={item.id}>

                                    <div className={styles.gallery_tile}>
                                        <Link to={`/collection/${item.id}`} className={styles.tileLink}>
                                            <div className={styles.imageContainer}>
                                                <img src={item.image_url}
                                                    alt={`Artwork titled ${item.title}`}>
                                                </img>
                                            </div>
                                        </Link>
                                        <div className={styles.pictureDetails}>
                                            <button
                                                type="button"
                                                className={styles.heart}
                                                onClick={() => handleFavorites(item.id)}
                                                aria-pressed={favorites.has(item.id)}
                                                aria-label={
                                                    favorites.has(item.id)
                                                        ? "Remove from favorites"
                                                        : "Add to favorites"
                                                }>
                                                <Heart fill={favorites.has(item.id) ? "red" : "none"} />
                                            </button>
                                            <div className={styles.name}>{item.title}</div>
                                            <div>{item.price} <span>{item.currency}</span></div>
                                        </div>

                                    </div>

                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
            )
            }
        </>)
}