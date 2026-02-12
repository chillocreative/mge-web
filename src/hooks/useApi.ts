"use client";

import { useState, useCallback } from "react";

/**
 * Standardized loading and error state manager for API calls
 */
export function useApi<T>(apiFunc: (...args: any[]) => Promise<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(
        async (...args: any[]) => {
            try {
                setLoading(true);
                setError(null);
                const result = await apiFunc(...args);
                setData(result);
                return result;
            } catch (err: any) {
                setError(err.message || "An engineering technical error occurred.");
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [apiFunc]
    );

    return { data, loading, error, execute };
}
