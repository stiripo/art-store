import type { WishlistProps } from "../../types"
import { Link } from "react-router-dom"
import styles from "./Wishlist.module.scss"
import { Heart } from 'lucide-react'

export function Wishlist({ collection, favorites, onRemove }: WishlistProps) {

	const favoriteItems = collection.filter(item => favorites.has(item.id))

	return (
		<section className={styles.wishlist}>
			<h2 className={styles.title}>Items on your wishlist</h2>

			{favoriteItems.length === 0 ? (
				<div className={styles.empty} role="status" aria-live="polite">You have no items on your wishlist.</div>
			) : (
				<ul className={styles.list}>
					{favoriteItems.map(item => (
						<li key={item.id} className={styles.item}>
							<Link to={`/collection/${item.id}`} className={styles.itemLink}>
								<div className={styles.image}>
									<img
										src={item.image_url}
										srcSet={`${item.image_url}-160.webp 160w,
										${item.image_url}-300.webp 300w,
                                                    ${item.image_url}-600.webp 600w`}
													sizes="84px"
										alt={item.title} />
								</div>

								<div className={styles.details}>
									<div className={styles.itemTitle}>{item.title}</div>
									<div className={styles.medium}>{item.medium}</div>
									<div className={styles.price}>{item.price}</div>
								</div>
							</Link>
							<button
								type="button"
								className={styles.removeButton}
								onClick={() => onRemove(item.id)}
								aria-label={`Remove ${item.title} from wishlist`}
							>
								<Heart
									fill="#e11d48"
									stroke="#b91c1c"
									strokeWidth={1.3}
									size={20}
								/>
							</button>
						</li>
					))}
				</ul>
			)}
		</section>
	)
}