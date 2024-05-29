'use client';
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
                    <li className={styles.awards_list__head}>
                        <span>대회명</span>
                        <span>대회일자</span>
                        <span>부문-1</span>
                        <span>부문-2</span>
                        <span>결과</span>
                        <span>수정</span>
                    </li>
                    <p className={styles.not_awards}>수상 내역이 없습니다.</p>
                </ul>
            ) : (
                <ul className={styles.awards_list}>
                    <li className={styles.awards_list__head}>
                        <span>대회명</span>
                        <span>대회일자</span>
                        <span>부문-1</span>
                        <span>부문-2</span>
                        <span>결과</span>
                        <span>수정</span>
                    </li>

                    {awards.map((award, index) => (
                        <li key={index} className={`${styles.awards_list__item} `}>
                            <span>{award.year} | {award.name}</span>
                            {/* <span>{award.end_date ? `${award.start_date} - ${award.end_date}` : award.start_date}</span> */}
                            <span>{award.start_date}</span>
                            <span>{award.level}</span>
                            <span>{award.division}</span>
                            <span>{award.result}</span>
                            <span onClick={() => clickDelete(award.page_id)}
                                className={`${styles.delete} ${deletingIds.includes(award.page_id) ? styles.updating : ""}`}>
                                {deletingIds.includes(award.page_id) ? "삭제중" : "삭제"}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}