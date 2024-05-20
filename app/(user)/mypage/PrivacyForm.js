'use client';
import { useState } from "react";
import styles from './form.module.scss';

export default function Form({ privacy }) {
    const [name, setName] = useState(privacy.name);
    const [birthday, setBirthday] = useState(privacy.birthday);
    const [email, setEmail] = useState(privacy.email);
    const [tel, setTel] = useState(privacy.tel);
    const [alarm, setAlarm] = useState(privacy.alarm);
    const page_id = privacy.page_id;
    const [update, setUpdate] = useState('update');
    const [state, setState] = useState(true);

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
            name: name || '이름',
            birthday: birthday,
            email: email || '이메일',
            tel: tel || '000-0000-0000',
            alarm: alarm || false,
            id: page_id
        };

        try {

            const postFetch = await fetch('/api/database/notion/updatePrivacy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const response = await postFetch.json()
            setState(response);
            setUpdate('update')

        } catch (error) {
            console.error('Error updating data:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.label}>
                <span className={styles.title}>name</span>
                <div>
                    [<input className={styles.input} onChange={(e) => {
                        setName(e.target.value)
                    }} type="text" value={name} name="이름" placeholder="이름을 적어주세요." required />]
                </div>
            </label>
            <label className={styles.label}>
                <span className={styles.title}>birthday</span>
                <div>
                    [<input className={styles.input} onChange={(e) => {
                        setBirthday(e.target.value)
                    }} type="date" value={birthday} name="생일" placeholder="생일을 적어주세요." />]
                </div>
            </label>
            <label className={styles.label}>
                <span className={styles.title}>email</span>
                <div>
                    [<input className={styles.input} onChange={(e) => {
                        setEmail(e.target.value)
                    }} type="email" value={email} name="이메일" placeholder="이메일을 적어주세요." />]
                </div>
            </label>
            <label className={styles.label}>
                <span className={styles.title}>tel</span>
                <div>
                    [<input className={styles.input} onChange={(e) => {
                        setTel(e.target.value)
                    }} type="tel" value={tel} name="연락처" placeholder="핸드폰 번호를 적어주세요." />]
                </div>
            </label>
            <label className={styles.label}>
                <span className={styles.title}>push alarm</span>
                <div className={styles.alarm_box}>
                    <span className={styles.alarm}>{alarm ? "🔔 알림 수신 동의" : "🔕 알림 수신 미동의"}</span>
                    <input className={styles.input} onChange={(e) => {
                        setAlarm(e.target.checked)
                    }} hidden type="checkbox" checked={alarm} name="알림" />
                </div>
            </label>

            <button className={`${styles.button} ${!state ? styles.uploading : ""}`} type="submit">{update}</button>
        </form>
    )
}