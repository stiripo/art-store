import { getFavoritesFromLocalStorage } from "../../utils.ts";

export function Wishlist() {

    const favorites = getFavoritesFromLocalStorage();

    return (
        <>
            <h2>Items on your wishlist</h2>
            <ul>
                {favorites.map(item => (
                    <li>Item id {item}</li>
                ))}
            </ul>
        </>


    )
}