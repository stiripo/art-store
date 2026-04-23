import { memo } from 'react';
import styles from './FilterForm.module.scss';
import type { FilterFormProps } from '../../types';


export const FilterForm = memo(function FilterForm({ categories, filterCategory, onFilterChange }: FilterFormProps) {

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
})