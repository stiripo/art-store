import { useState, useMemo, useContext } from "react";
import { FilterForm } from "../FilterForm/FilterForm";
import styles from "./Collection.module.scss";
import { Link } from "react-router-dom";
import { Heart } from 'lucide-react';
import { FavoritesContext } from "../../context/FavoritesContext";
import { useCollection } from "../../context/CollectionContext";


export function Collection() {

    const { collection, loading } = useCollection();
    const { favorites, toggleFavorites } = useContext(FavoritesContext)!;
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
            {collection.length === 0 ? (<div role="status" aria-live="polite">No artworks yet</div>) : (

                <section>
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
                    <section>
                        <div aria-live="polite" className={styles.showing}>
                            Showing {filteredCollection.length} artworks
                        </div>
                        <div className={styles.main}>
                            <ul className={styles.list_of_artworks}>
                                {filteredCollection.map((item, index) => (
                                    <li key={item.id}>

                                        <article className={styles.gallery_tile}>
                                            <Link to={`/collection/${item.id}`} className={styles.tileLink}>
                                                <div className={styles.imageContainer}>
                                                    <img
                                                        src={item.image_url}
                                                        srcSet={`${item.image_url}-160.webp 160w,
                                                        ${item.image_url}-300.webp 300w,
                                                    ${item.image_url}-600.webp 600w`}
                                                        sizes="(width <= 600px) 145px, 235px"
                                                        alt={`Artwork titled ${item.title}`}
                                                        loading={index < 3 ? 'eager' : 'lazy'}
                                                        fetchPriority={index < 3 ? 'high' : 'auto'}>
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
                                        </article>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                </section>
            )
            }
        </>)
}