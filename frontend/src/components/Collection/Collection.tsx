import { useState, useEffect, useMemo } from "react";
import type { CollectionItem } from "../../types";
import { FilterForm } from "../FilterForm/FilterForm";
import styles from "./Collection.module.scss";
import { Link } from "react-router-dom"

//TODO: View artwork overlay
//TODO: apiResponse type
//TODO: paginated data

//TODO: more filters
//TODO: favorites
//TODO: state management

//TODO: Item page

export function Collection() {

    const [collection, setCollection] = useState<CollectionItem[]>([]);
    const [filterCategory, setFilterCategory] = useState<string>('All');
    const [loading, setLoading] = useState(true);

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
            const data: CollectionItem[] = await response.json();
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

    if (loading) return <div aria-busy="true">Loading...</div>;

    return (
        <>
            {collection.length === 0 ? (<div>No artworks yet</div>) : (

                <div>
                    <h2 className={styles.headline}>Gallery</h2>

                    <FilterForm
                        categories={categories}
                        onFilterChange={setFilterCategory}
                        filterCategory={filterCategory} />
                    <div>

                        <div aria-live="polite">
                            {filteredCollection.length} artworks shown
                        </div>

                        <ul>
                            {filteredCollection.map(item => (
                                <li key={item.id}>
                                    <Link to={`/collection/${item.id}`} className={styles.tileLink}>
                                        <div className={styles.gallery_tile}>
                                            <div className={styles.imageContainer}>


                                                <img src={item.image_url}
                                                    alt={`Artwork titled ${item.title}`}
                                                >
                                                </img>


                                            </div>
                                            <div className={styles.pictureDetails}>
                                                <div className={styles.name}>{item.title}</div>
                                                <div>{item.price} <span>{item.currency}</span></div>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
            )
            }
        </>)
}