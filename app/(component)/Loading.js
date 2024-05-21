'use client';
import { useState, useEffect } from "react";
import styles from './loading.module.scss';

export default function Loading() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prevCount => prevCount + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <p className={styles.loading}>{`Loading ... ${count}s`}</p>;
}