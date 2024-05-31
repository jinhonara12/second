'use client';
import Link from 'next/link';
import { useState } from 'react';
import styles from './page.module.scss';

export default function AwardsList({ list }) {
    const [awards, setAwards] = useState(list);
    const [state, setState] = useState(true);
    const [deletingIds, setDeletingIds] = useState([]);
    const clickDelete = async (id) => {
        setDeletingIds(prev => [...prev, id]);
        const formData = {
            page_id: id
        }
        if (state === true) {
            setState(false)
            try {
                const postFetch = await fetch('/api/database/notion/deleteAwards', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const response = await postFetch.json();

                if (response) {
                    const updatedAwards = awards.filter(award => award.page_id !== id);
                    setAwards(updatedAwards);
                    setDeletingIds(prev => prev.filter(deleteId => deleteId !== id));
                    setState(true)
                }

            } catch (error) {
                console.error('Error updating data:', error);
            }
        }

    }

    return (
        <div className={styles.awards}>
            <h3>수상내역</h3>
            {awards.length === 0 ? (
                <ul className={styles.awards_list}>
                    <li className={`${styles.awards_list__head} ${styles.pc}`}>
                        <span>대회명</span>
                        <span>대회일자</span>
                        <span>부문-1</span>
                        <span>부문-2</span>
                        <span>결과</span>
                        <span>수정</span>
                    </li>
                    <p className={styles.not_awards}>
                        <span>수상 내역이 없습니다.</span>
                        <Link href="/event-recruitment">진행중인 대회 확인하기<img src="/icons/link_24px.png" /></Link>
                    </p>
                </ul>
            ) : (
                <ul className={styles.awards_list}>
                    <li className={`${styles.awards_list__head} ${styles.pc}`}>
                        <span>대회명</span>
                        <span>대회일자</span>
                        <span>부문-1</span>
                        <span>부문-2</span>
                        <span>결과</span>
                        <span>수정</span>
                    </li>

                    {awards.map((award, index) => (
                        <li key={index} className={`${styles.awards_list__item} `}>
                            <div className={styles.pc}>
                                <span>{award.year} | {award.name}</span>
                                <span>{(award.start_date).split("T")[0]}</span>
                                <span>{award.level}</span>
                                <span>{award.division}</span>
                                <span>{award.result}</span>
                                <span onClick={() => clickDelete(award.page_id)}
                                    className={`${styles.delete} ${deletingIds.includes(award.page_id) ? styles.updating : ""}`}>
                                    {deletingIds.includes(award.page_id) ? "삭제중" : "삭제"}
                                </span>
                            </div>
                            <div className={styles.mo}>
                                <div className={styles.content}>
                                    <div className={styles.mo__title_box}>
                                        <span className={styles.date}>[{(award.start_date).split("T")[0]}]</span>
                                        {/* <span className={styles.year}>[{award.year}]</span> */}
                                        <span className={styles.name}>{award.name}</span>
                                    </div>
                                    <div className={styles.mo__result_box}>
                                        <span>[{award.level}]</span>
                                        <span>[{award.division}]</span>
                                        <span>[{award.result}]</span>
                                    </div>
                                </div>
                                <span onClick={() => clickDelete(award.page_id)}
                                    className={`${styles.delete} ${deletingIds.includes(award.page_id) ? styles.updating : ""}`}>
                                    {deletingIds.includes(award.page_id) ? "삭제중" : "삭제"}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}