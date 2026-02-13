import styles from './FilterForm.module.scss';


interface FilterFormProps {
    categories: string[],
    filterCategory: string,
    onFilterChange: (category: string) => void,
}

export function FilterForm({ categories, filterCategory, onFilterChange }: FilterFormProps) {

const options = categories.map((cat) =>
                <div key={cat}>
                    <input
                    type="radio"
                    id={cat}
                    name="category"
                    value={cat}
                    checked={filterCategory === cat}
                    onChange={e => onFilterChange(e.target.value)} />
                    <label htmlFor={cat}>{cat}</label>
                </div>
    );

    return (
        <form>
            <fieldset>
                <legend>Filter by category</legend>
                <div>{options}</div>
            </fieldset>

        </form>
    )
}