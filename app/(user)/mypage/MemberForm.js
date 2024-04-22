'use client';
import { useState } from "react";
import Link from "next/link";
import styles from './form.module.scss';

export default function Form({ member, bar, club, team }) {
    const allBarList = bar.map(item => ({
        name: item.name,
        id: item.page_id
    }))
    const allClubList = club.map(item => ({
        name: item.name,
        id: item.page_id
    }))
    const allTeamList = team.map(item => ({
        name: item.name,
        id: item.page_id
    }))
    const [nickname, setNickame] = useState(member.nickname);
    const [swingDay, setSwingDay] = useState(member.swing_date);
    const [barArray, setBarArray] = useState(member.barArray);
    const [clubArray, setClubArray] = useState(member.clubArray);
    const [teamMemberArray, setTeamMemberArray] = useState(member.teamMemberArray);
    const page_id = member.page_id;
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
    const handleClubCheckBox = (e) => {
        const { checked, name } = e.target;

        setClubArray((prev) => {
            if (checked) {
                // checkbox가 체크될 때
                return [...prev, name];
            } else {
                // checkbox가 해제될 때
                return prev.filter((item) => item !== name);
            }
        });

    }
    const handleTeamCheckBox = (e) => {
        const { checked, name } = e.target;

        setTeamMemberArray((prev) => {
            if (checked) {
                // checkbox가 체크될 때
                return [...prev, name];
            } else {
                // checkbox가 해제될 때
                return prev.filter((item) => item !== name);
            }
        });
    }
    const handleBarCheckBox = (e) => {
        const { checked, name } = e.target;
        setBarArray((prev) => {
            if (checked) {
                // checkbox가 체크될 때
                return [...prev, name];
            } else {
                // checkbox가 해제될 때
                return prev.filter((item) => item !== name);
            }
        });
    }
    const updateData = async () => {
        const formData = {
            nickname: nickname || '닉네임',
            swingDay: swingDay,
            id: page_id,
            barArray: allBarList.filter(list => barArray.includes(list.name)).map(item => ({
                id: item.id
            })) || [],
            clubArray: allClubList.filter(list => clubArray.includes(list.name)).map(item => ({
                id: item.id
            })) || [],
            teamMemberArray: allTeamList.filter(list => teamMemberArray.includes(list.name)).map(item => ({
                id: item.id
            })) || []
        };

        try {
            const postFetch = await fetch('/api/database/notion/updateMember', {
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
                <span className={styles.title}>nickname</span>
                [<input className={styles.input} onChange={(e) => {
                    setNickame(e.target.value)
                }} type="text" value={nickname} name="닉네임" placeholder="닉네임을 적어주세요." required />]
            </label>

            <label className={styles.label}>
                <span className={styles.title}>swing date</span>
                [<input className={styles.input} onChange={(e) => {
                    setSwingDay(e.target.value)
                }} type="date" value={swingDay} name="스윙시작날" />]
            </label>

            <label className={styles.label}>
                <span className={styles.title}>swing years</span>
                [<input className={styles.input} readOnly type="text" value={`${member.swing_years !== undefined ? member.swing_years + "년차" : ""}`} name="스윙 연차" placeholder="스윙시작 날짜를 기입해주세요." />]
            </label>

            <label className={styles.label}>
                <span className={styles.title}>swing days</span>
                [<input className={styles.input} readOnly type="text" value={`${member.swing_days !== undefined ? member.swing_days + "일" : ""}`} name="스윙 일수" placeholder="스윙시작 날짜를 기입해주세요." />]
            </label>

            <div className={styles.label}>
                <span className={styles.title}>favorite bar</span>
                <div className={styles.wrap_box}>
                    {allBarList.map(item => {
                        const isChecked = barArray.includes(item.name);
                        return (
                            <label key={item.id} className={`${styles.check_box} ${isChecked ? styles.checked : ""}`}>
                                {item.name}
                                <input hidden onChange={handleBarCheckBox} type="checkbox" name={item.name} value={item.id} checked={isChecked} />
                            </label>
                        );

                    })}
                </div>
            </div>

            <div className={styles.label}>
                <span className={styles.title}>favorite club</span>
                <div className={styles.wrap_box}>
                    {allClubList.map(item => {
                        const isChecked = clubArray.includes(item.name);
                        return (
                            <label key={item.id} className={`${styles.check_box} ${isChecked ? styles.checked : ""}`}>
                                {item.name}
                                <input hidden onChange={handleClubCheckBox} type="checkbox" name={item.name} value={item.id} checked={isChecked} />
                            </label>
                        );
                    })}
                </div>
            </div>

            <div className={styles.label}>
                <span className={styles.title}>my team</span>
                <div className={styles.wrap_box}>
                    {allTeamList.map(item => {
                        const isChecked = teamMemberArray.includes(item.name);
                        return (
                            <label key={item.id} className={`${styles.check_box} ${isChecked ? styles.checked : ""}`}>
                                {item.name}
                                <input hidden onChange={handleTeamCheckBox} type="checkbox" name={item.name} value={item.id} checked={isChecked} />
                            </label>
                        );
                    })}
                </div>
            </div>

            <div className={styles.label}>
                <span className={styles.title}>interested event</span>
                <div className={styles.wrap_box}>
                    {member.eventArray.length === 0 ? <span className={styles.not}>관심있는 행사를 등록하지 않았습니다.</span> :
                        member.eventArray.map(item => {
                            return (
                                <Link className={styles.link} key={item} href={""} target="_blank" title={item} >{item}
                                    <img src="/icons/link_24px.png" />
                                </Link>
                            )
                        })
                    }
                </div>
            </div>

            <div className={styles.label}>
                <span className={styles.title}>interested festival</span>
                <div>
                    {member.festArray.length === 0 ? <span className={styles.not}>관심있는 대회를 등록하지 않았습니다.</span> :
                        member.festArray.map(item => {
                            return (
                                <Link className={styles.link} key={item} href={""} target="_blank" title={item} >{item}
                                    <img src="/icons/link_24px.png" />
                                </Link>
                            )
                        })
                    }
                </div>
            </div>

            <button className={`${styles.button} ${!state ? styles.uploading : ""}`} type="submit">{update}</button>
        </form>
    )
}