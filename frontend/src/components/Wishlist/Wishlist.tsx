import type { WishlistProps } from "../../types"

export function Wishlist({ favorites }: WishlistProps) {

    return (
        <>
            <h2>Items on your wishlist</h2>
            <ul>
                {[...favorites].map(item => (
                    <li>Item id {item}</li>
                ))}
            </ul>
        </>


    )
}