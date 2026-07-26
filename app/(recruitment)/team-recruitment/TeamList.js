'use client';

import { useState } from 'react';
import styles from './page.module.scss';
import Pagination from '../../(component)/Pagination';

export default function TeamList({ response = [] }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const totalPages = Math.ceil(response.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = response.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            <ul className={styles.list_box}>
                {currentItems.map((list, index) => (
                    <li key={index} className={styles.list}>
                        <div className={styles.left}>
                            <div className={styles.top}>
                                <p>{list.team}</p>
                            </div>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.title}>
                                <h2>{list.name}</h2>
                            </div>
                            <div className={styles.date}>
                                <div className={styles.dday}>
                                    <span>{list.dday}</span>
                                </div>
                                <div className={styles.date_period}>
                                    <span>{list.start_date}</span>
                                    {list.end_date && (
                                        <>
                                            <span>-</span>
                                            <span>{list.end_date}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className={styles.link}>
                                {list.url ? (
                                    <a href={list.url} target="_blank" rel="noreferrer">
                                        신청링크 <img src="/icons/link_24px.png" alt="신청링크" />
                                    </a>
                                ) : (
                                    <span>링크 미작성</span>
                                )}
                            </div>
                            <div className={styles.created_date}>
                                <span>작성일 | {list.created_time?.split('T')[0]}</span>
                                <span>수정일 | {list.last_modified_time?.split('T')[0]}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
            />
        </>
    );
}
