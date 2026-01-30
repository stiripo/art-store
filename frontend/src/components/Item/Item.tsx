import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { CollectionItem } from "../../types";
import styles from "./Item.module.scss"


export function Item() {

    const { id } = useParams();

    const [item, setItem] = useState<CollectionItem>({} as CollectionItem);
    const [error, setError] = useState<string | null>(null);

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
            {error ? (<div>{error}</div>) : (
                <div className={styles.container}>
                    <img src={item.image_url} alt={item.title}></img>
                </div>
            )}
        </>
    )
}