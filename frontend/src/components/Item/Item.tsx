import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Heart } from 'lucide-react';
import type { CollectionItem } from "../../types";
import styles from "./Item.module.scss";
import { useFavorites } from "../../context/FavoritesContext";


export function Item() {

    const { favorites, toggleFavorites } = useFavorites();
    const [item, setItem] = useState<CollectionItem>({} as CollectionItem);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams();

    const fetchItem = async () => {
        try {
            const response = await fetch(`http://localhost:8080/collection/${id}`);
            if (!response.ok) {
                throw new Error('Error fetching data')
            }
            const data: CollectionItem = await response.json();
            setItem(data);
        }
        catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            }
            else { setError('An unknown error occurred'); }
        }
    }

    useEffect(() => {
        fetchItem();
    }, [id]);

    return (
        <>
            {error ? (<div className={styles.error}>{error}</div>) : (
                <article className={styles.container}>
                    <div className={styles.imageWrapper}>
                        <img
                            src={item.image_url}
                            srcSet={`${item.image_url}-160.webp 160w,
                                ${item.image_url}-300.webp 300w,
                                ${item.image_url}-600.webp 600w`}
                            sizes="(max-width: 600px) 325px, 400px"
                            alt={item.title}
                        />
                    </div>
                    <div className={styles.details}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>{item.title}</h1>
                            <button
                                type="button"
                                className={styles.heart}
                                onClick={() => toggleFavorites(item.id)}
                                aria-pressed={favorites.has(item.id)}
                                aria-label={
                                    favorites.has(item.id)
                                        ? "Remove from favorites"
                                        : "Add to favorites"
                                }
                            >
                                <Heart
                                    fill={favorites.has(item.id) ? "#e11d48" : "none"}
                                    stroke={favorites.has(item.id) ? "#b91c1c" : "#39383b"}
                                    strokeWidth={1.3}
                                    size={24}
                                />
                            </button>
                        </div>
                        <div className={styles.meta}>
                            {item.category && <span className={styles.category}>{item.category}</span>}
                            {item.medium && <span className={styles.medium}>{item.medium}</span>}
                        </div>
                        {item.price && (
                            <div className={styles.priceSection}>
                                <span className={styles.price}>{item.price}</span>
                                {item.currency && <span className={styles.currency}>{item.currency}</span>}
                            </div>
                        )}
                    </div>
                </article>
            )}
        </>
    )
}