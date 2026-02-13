import { useState, useEffect, useMemo } from "react";
import type { CollectionItem } from "../../types";
import { FilterForm } from "../FilterForm/FilterForm";
import styles from "./Collection.module.scss";
import { Link } from "react-router-dom"

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

    const fetchCollection = async () : Promise<void> => {
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

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2 className={styles.headline}>Gallery</h2>
                <>
                    <FilterForm
                    categories={categories}
                    onFilterChange={setFilterCategory}
                    filterCategory={filterCategory}/>
                    <div>

                        <ul>
                            {filteredCollection.map(item => (
                                <li key={item.id}>

                                    <div className={styles.gallery_tile}>
                                        <div className={styles.imageContainer}>
                                            <Link to={`/collection/${item.id}`}>
                                                <img src={item.image_url}
                                                    alt={item.title}
                                                >
                                                </img>
                                            </Link>
                                        </div>
                                        <div className={styles.pictureDetails}>
                                            <div className={styles.name}>{item.title}</div>
                                            <div>{item.price} <span>{item.currency}</span></div>
                                        </div>
                                    </div>

                                </li>
                            ))}
                        </ul>

                    </div>
                </>
        </div>
    )
}