import type { WishlistProps } from "../../types"
import styles from "./Wishlist.module.scss"

export function Wishlist({ collection, favorites }: WishlistProps) {

	const favoriteItems = collection.filter(item => favorites.has(item.id))

	return (
		<section className={styles.wishlist}>
			<h2 className={styles.title}>Items on your wishlist</h2>

			{favoriteItems.length === 0 ? (
				<div className={styles.empty}>You have no items on your wishlist.</div>
			) : (
				<ul className={styles.list}>
					{favoriteItems.map(item => (
						<li key={item.id} className={styles.item}>
							<div className={styles.image}>
								<img src={item.image_url} alt={item.title} />
							</div>

							<div className={styles.details}>
								<div className={styles.itemTitle}>{item.title}</div>
								<div className={styles.category}>{item.category}</div>
								<div className={styles.price}>{item.price}</div>
							</div>
						</li>
					))}
				</ul>
			)}
		</section>
	)
}