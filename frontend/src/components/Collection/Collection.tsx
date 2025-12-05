import { useState, useEffect } from "react";
import type { CollectionItem } from "../../types";
import styles from "./Collection.module.scss";
import { Link } from "react-router-dom"

export function Collection() {

    const [collection, setCollection] = useState<CollectionItem[]>([]);

    const fetchCollection = async () => {
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
    }

    useEffect(() => {
        fetchCollection();
        console.log(collection);
    }, []);

    return (
        <div>
            <h2 className={styles.headline}>Gallery</h2>
            {collection.length > 0 ? (
                <div>
                    <ul>
                        {collection.map(item => (
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
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}