import { useState, useEffect } from "react";
import type { CollectionItem } from "../types";
import { CollectionContext } from "./CollectionContext";


export function CollectionProvider({ children }: { children: React.ReactNode }) {

    const [collection, setCollection] = useState<CollectionItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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

    return (
        <CollectionContext value={{ collection, loading }}>
            {children}
        </CollectionContext>
    )
}