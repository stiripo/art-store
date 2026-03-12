 export const getFavoritesFromLocalStorage = (): number[] => {
        try {
            const stored = localStorage.getItem('favorites');
            if (!stored) return [];

            const parsed: unknown = JSON.parse(stored);

            if (
                Array.isArray(parsed) &&
                parsed.every(item => typeof item === 'number')
            ) {
                return parsed;
            }

            return [];
        } catch {
            return [];
        }
    }