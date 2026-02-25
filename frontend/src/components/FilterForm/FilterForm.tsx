import styles from './FilterForm.module.scss';


interface FilterFormProps {
    categories: string[],
    filterCategory: string,
    onFilterChange: (category: string) => void,
}

export function FilterForm({ categories, filterCategory, onFilterChange }: FilterFormProps) {

    const options = categories.map((cat) =>
        <label key={cat} className={styles.option}>
            <input
                type="radio"
                name="category"
                value={cat}
                checked={filterCategory === cat}
                onChange={e => onFilterChange(e.target.value)} />
            <span>{cat}</span>
        </label>
    );

    return (
        <form>
            <fieldset>
                <div className={styles.filterRow}>
                    <legend>Filter by category</legend>
                    <div>{options}</div>
                </div>
            </fieldset>

        </form>
    )
}