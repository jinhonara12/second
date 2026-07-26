'use client';

import { useState } from 'react';
import styles from './page.module.scss';
import Pagination from '../../(component)/Pagination';
import Heart from './Heart';

export default function FestivalList({ response = [], userInfo }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // 한 페이지당 8개 표시

    const totalPages = Math.ceil(response.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = response.slice(indexOfFirstItem, indexOfLastItem);

    function slugify(text) {
        return text
            .trim()
            .replace(/['"]/g, "")
            .replace(/\s+/g, "-");
    }

    return (
        <>
            <ul className={styles.list_box}>
                {currentItems.map((list, index) => (
                    <li className={styles.list} key={index}>
                        <div className={styles.img_box}>
                            {list.photo ? (
                                <img src={list.photo} loading="lazy" alt={list.name} />
                            ) : (
                                <div className={styles.no_img}></div>
                            )}
                            <div className={styles.heart_box}>
                                {(userInfo && (
                                    <Heart
                                        id={list.page_id}
                                        page={userInfo.festArray}
                                        user_id={userInfo.page_id}
                                    />
                                )) || <Heart id={list.page_id} />}
                            </div>
                        </div>

                        <div className={styles.title_box}>
                            <span>{list.year}</span>
                            <h3>{list.name}</h3>
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
                            <a
                                href={`/festival-recruitment/${list.page_id}/${slugify(
                                    list.name
                                )}?classification=${list.classification}`}
                            >
                                상세페이지 <img src="/icons/link_24px.png" alt="상세페이지" />
                            </a>
                            {list.home && (
                                <a href={list.home} target="_blank" rel="noreferrer">
                                    홈페이지 <img src="/icons/link_24px.png" alt="홈페이지" />
                                </a>
                            )}
                            {list.url && (
                                <a href={list.url} target="_blank" rel="noreferrer">
                                    신청링크 <img src="/icons/link_24px.png" alt="신청링크" />
                                </a>
                            )}
                            {list.check_url && (
                                <a href={list.check_url} target="_blank" rel="noreferrer">
                                    확인링크 <img src="/icons/link_24px.png" alt="확인링크" />
                                </a>
                            )}
                        </div>
                        <div className={styles.created_date}>
                            <span>작성일 | {list.created_time?.split('T')[0]}</span>
                            <span>수정일 | {list.last_modified_time?.split('T')[0]}</span>
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
