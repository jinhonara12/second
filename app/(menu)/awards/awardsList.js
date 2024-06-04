'use client'

import Link from 'next/link';
import { useState } from 'react';
import styles from './page.module.scss';
export default function awardsList({ data }) {
    const [list, setList] = useState(data);
    const [sortConfig, setSortConfig] = useState({});
    const [state, setState] = useState(false)

    function sorting(e) {
        const sortKey = e.target.dataset.sort;
        let direction = 'ascending';

        // 열의 정렬 상태를 토글합니다.
        if (sortConfig[sortKey] === 'ascending') {
            direction = 'descending';
        }

        // 현재 열의 정렬 상태를 업데이트합니다.
        setSortConfig({
            ...sortConfig,
            [sortKey]: direction
        });

        setList((prevList) => {
            const sortedList = [...prevList].sort((a, b) => {
                if (a[sortKey] < b[sortKey]) return direction === 'ascending' ? -1 : 1;
                if (a[sortKey] > b[sortKey]) return direction === 'ascending' ? 1 : -1;
                return 0;
            });
            return sortedList;
        });
    }

    async function searching(e) {
        e.preventDefault();
        setState(prev => !prev);
        const keyword = e.target[0].value;

        try {
            const response = await fetch('../../api/database/notion/searchingAwardList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(keyword),
            })
            const data = await response.json();
            setState(prev => !prev)
            setList(data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div className={styles.awards_wrap}>
            <div className={styles.awards_search}>
                <form onSubmit={searching}>
                    <input type="search" placeholder='닉네임을 입력해주세요.' />
                    <button type="submit" >{state ? "검색중" : "검색"}</button>
                </form>
            </div>
            <ul className={styles.awards_list}>
                <li className={`${styles.awards_list__head} ${styles.awards_list__li}`}>
                    <span data-sort="user" onClick={sorting}>닉네임<img src="/icons/sorting.svg" /> </span>
                    <span className={styles.year} data-sort="year" onClick={sorting}>연도<img src="/icons/sorting.svg" /> </span>
                    <span data-sort="event_name" onClick={sorting}>대회명<img src="/icons/sorting.svg" /> </span>
                    <span data-sort="start_date" onClick={sorting}>대회일자<img src="/icons/sorting.svg" /> </span>
                    <span data-sort="level" onClick={sorting}>부문-1<img src="/icons/sorting.svg" /> </span>
                    <span data-sort="division" onClick={sorting}>부문-2<img src="/icons/sorting.svg" /> </span>
                    <span data-sort="result" onClick={sorting}>결과<img src="/icons/sorting.svg" /> </span>
                </li>
                {list.length === 0 ?
                    <li className={styles.awards_list__none}>
                        <p>등록된 수상 내역이 없습니다.</p>
                        <p>다양한 대회 정보는 <Link href="/event-recruitment">여기</Link>에서 확인하실 수 있습니다.</p>
                    </li> : list.map(item => {
                        return (
                            <li key={item.page_id} className={styles.awards_list__li} data-item_id={item.page_id}>
                                <span>{item.valid_date ? `⭐️${item.user}` : item.user}</span>
                                <span className={styles.year}>{item.year}</span>
                                <span>{item.event_name}</span>
                                <span>{(item.start_date).split('T')[0]}</span>
                                <span>{item.level}</span>
                                <span>{item.division}</span>
                                <span>{item.result}</span>
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}