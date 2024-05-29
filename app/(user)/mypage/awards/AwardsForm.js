'use client';
import { useState } from 'react';
import getEventData from '../../../lib/static_database/event';
import styles from './awardForm.module.scss';

export default function awardsForm({ data }) {
    const { page_id: userId, nickname: userName } = data;
    const [update, setUpdate] = useState('update');
    const [state, setState] = useState(true);
    const [eventId, setEventId] = useState('');
    const [division, setDivision] = useState('');
    const [level, setLevel] = useState('');
    const [result, setResult] = useState('');
    const eventGroup = getEventData.reduce((acc, cur) => {
        if (!acc[cur.year]) {
            acc[cur.year] = [];
        }
        acc[cur.year].push(cur);
        return acc
    }, {})

    const handleSubmit = (e) => {
        e.preventDefault();
        if (state) {
            setState(false)
            setUpdate('waiting...');
            updateData()
        }
    };

    const updateData = async () => {
        const formData = {
            user_id: userId,
            nickname: userName,
            eventId,
            division,
            level,
            result
        };
        try {
            const postFetch = await fetch('/api/database/notion/updateAwards', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const response = await postFetch.json();
            setState(response);
            setUpdate('update');
            window.location.reload()
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }

    const clickInputRadio = (e) => {
        switch (e.target.name) {
            case "event":
                setEventId(e.target.value)
                break
            case "division":
                setDivision(e.target.value);
                break
            case "level":
                setLevel(e.target.value);
                break
            case "result":
                setResult(e.target.value);
                break
        }

    }

    return (
        <form onSubmit={handleSubmit} className={styles.event__form}>
            <span className={styles.google_form}>원하는 대회가 없으시다면, <a href="https://forms.gle/wftQnqtMKK1VVCq96" target="_blank">여기</a>에 알려주세요.</span>
            <div className={`${styles.event_list} ${styles.event_wrap}`}>
                <h3>event</h3>
                {/* <div className={`${styles.double_label_wrap} ${styles.pc}`}>
                    {Object.keys(eventGroup).map((year) => (
                        <div className={styles.event_year} key={year}>
                            <span className={styles.year__text}>{year}</span>
                            <div className={styles.event_year__list}>
                                {eventGroup[year].map((award) => (
                                    <label key={award.page_id} className={`${styles.label} ${eventId === award.page_id ? styles.checked : ''}`}>
                                        {award.name}
                                        <input className={styles.pc} hidden onChange={clickInputRadio} type="radio" value={award.page_id} name="event" required />
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div> */}
                <div className={`${styles.select}`}>
                    <select onChange={clickInputRadio} name="event" required>
                        <option value="">Select an event</option>
                        {Object.keys(eventGroup).map((year) => (
                            <optgroup key={year} label={year}>
                                {eventGroup[year].map((award) => (
                                    <option
                                        key={award.page_id}
                                        value={award.page_id}
                                        className={`${eventId === award.page_id ? styles.checked : ''}`}>
                                        {award.name}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>
            </div>
            <div className={`${styles.event_level} ${styles.event_wrap}`}>
                <h3>level</h3>
                <div className={styles.label_wrap}>
                    {['rookie', 'super rookie', 'open', 'advanced', 'all star', 'all level'].map((lvl) => (
                        <label key={lvl} className={`${styles.label} ${level === lvl ? styles.checked : ''}`}>
                            {lvl}
                            <input onChange={clickInputRadio} required hidden type="radio" value={lvl} name="level" />
                        </label>
                    ))}
                </div>
            </div>
            <div className={`${styles.event_division} ${styles.event_wrap}`}>
                <h3>division</h3>
                <div className={styles.label_wrap}>
                    {['strictly', 'lindy hop couple', 'team', 'm&m', 'solo jazz'].map((div) => (
                        <label key={div} className={`${styles.label} ${division === div ? styles.checked : ''}`}>
                            {div}
                            <input onChange={clickInputRadio} required hidden type="radio" value={div} name="division" />
                        </label>
                    ))}
                </div>
            </div>
            <div className={`${styles.event_result} ${styles.event_wrap}`}>
                <h3>result</h3>
                <div className={styles.label_wrap}>
                    {['1st', '2nd', '3rd', 'final'].map((res) => (
                        <label key={res} className={`${styles.label} ${result === res ? styles.checked : ''}`}>
                            {res}
                            <input onChange={clickInputRadio} required hidden type="radio" value={res} name="result" />
                        </label>
                    ))}
                </div>
            </div>

            <button className={`${styles.button} ${!state ? styles.uploading : ""}`} type="submit">{update}</button>
        </form>
    )
}