import { useState, useMemo } from "react";
import { FilterForm } from "../FilterForm/FilterForm";
import styles from "./Collection.module.scss";
import { Link } from "react-router-dom";
import { Heart } from 'lucide-react';
import type { CollectionProps } from "../../types";


//TODO: apiResponse type
//TODO: paginated data
//TODO: more filters
//TODO: Item page

//TODO: accessiblity
//TODO: performance optimization



export function Collection({ collection, favorites, toggleFavorites, loading }: CollectionProps) {

    const [filterCategory, setFilterCategory] = useState<string>('All');

    const filteredCollection = useMemo(() => {
        if (filterCategory === "All") return collection;
        return collection.filter((item) => item.category === filterCategory);
    }, [collection, filterCategory]);

    const categories = useMemo(() => {
        return ['All', ...new Set(collection.map((item => item.category)))]
    }, [collection]
    )

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
                        <Link to="/wishlist" className={styles.link_to_wishlist}>
                            <div className={styles.wishlist_icon}>
                                <Heart size={16} /><span>Wishlist</span>
                            </div>
                        </Link>
                    </div>
                    <div>
                        <div aria-live="polite" className={styles.showing}>
                            Showing {filteredCollection.length} artworks
                        </div>
                        <div className={styles.main}>
                            <ul className={styles.list_of_artworks}>
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
                                                    onClick={() => toggleFavorites(item.id)}
                                                    aria-pressed={favorites.has(item.id)}
                                                    aria-label={
                                                        favorites.has(item.id)
                                                            ? "Remove from favorites"
                                                            : "Add to favorites"
                                                    }>
                                                    <Heart
                                                        fill={favorites.has(item.id) ? "#e11d48" : "none"}
                                                        stroke={favorites.has(item.id) ? "#b91c1c" : "#39383b"}
                                                        strokeWidth={1.3} />
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
                </div>
            )
            }
        </>)
}