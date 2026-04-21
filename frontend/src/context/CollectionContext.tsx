import { createContext, useContext } from "react";
import type { CollectionContextType } from "../types";

export const CollectionContext = createContext<CollectionContextType | null>(null);

export function useCollection() {
    const context = useContext(CollectionContext);
    if (!context) {
        throw new Error("useCollection must be used within a CollectionProvider");
    }
    return context;
}