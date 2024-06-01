'use client';
import { useState } from "react";
import Link from "next/link";
import styles from '../form.module.scss';

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
    const [eventArray, setEventArray] = useState(member.eventArray);
    const [festArray, setFestArray] = useState(member.festArray);
    const [interestUpdate, setInterestUpdate] = useState(true);
    const [xMark, setXMark] = useState('❌');
    const member_id = member.page_id;
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
            id: member_id,
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
    const handelEvent = (e) => {
        const { type, page_type, page_id } = e.target.dataset;
        if (interestUpdate) {
            deleteHeart(type, page_type, page_id);
            setXMark('🔄');
        }
        setInterestUpdate(false);
    }
    const deleteHeart = async (type, page_type, page_id) => {
        const formData = {
            page_id: page_id,
            user_id: member_id,
            type: type,
            page_type: page_type
        };
        try {
            await fetch('/api/database/notion/updateHeart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }).then(result => {
                if (result) {
                    setInterestUpdate(true);
                    setXMark('❌');
                }
            });

            if (page_type === 'festival_recruitment') {
                setFestArray((prev) => {
                    return prev.filter(item => item.id !== page_id)
                })
            }
            if (page_type === 'event_recruitment') {
                setEventArray((prev) => {
                    return prev.filter(item => item.id !== page_id)
                })
            }

        } catch (error) {
            console.error('Error updating data:', error);
        }

    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <label className={styles.label}>
                <span className={styles.title}>nickname</span>
                <div>[<input className={styles.input} onChange={(e) => {
                    setNickame(e.target.value)
                }} type="text" value={nickname} name="닉네임" placeholder="닉네임을 적어주세요." required />]</div>
            </label>

            <label className={styles.label}>
                <span className={styles.title}>swing date</span>
                <div>
                    [<input className={styles.input} onChange={(e) => {
                        setSwingDay(e.target.value)
                    }} type="date" value={swingDay} name="스윙시작날" />]
                </div>
            </label>

            <label className={styles.label}>
                <span className={styles.title}>swing years</span>
                <div>
                    [<input className={styles.input} readOnly type="text" value={`${member.swing_years !== undefined ? member.swing_years + "년차" : ""}`} name="스윙 연차" placeholder="자동으로 계산됩니다." />]
                </div>
            </label>

            <label className={styles.label}>
                <span className={styles.title}>swing days</span>
                <div>
                    [<input className={styles.input} readOnly type="text" value={`${member.swing_days !== undefined ? member.swing_days + "일" : ""}`} name="스윙 일수" placeholder="자동으로 계산됩니다." />]
                </div>
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

            <button className={`${styles.button} ${!state ? styles.uploading : ""}`} type="submit">{update}</button>

            <div className={styles.label}>
                <span className={styles.title}>interested event</span>
                <div className={styles.wrap_box}>
                    {eventArray.length === 0 ? <span className={styles.not}>관심있는 행사를 등록하지 않았습니다.</span> :
                        eventArray.map(item => {
                            return (
                                <div className={styles.interested} key={item.id}>
                                    <Link className={styles.link} href={`/event-recruitment/${item.id}`} target="_blank" title={`${item.title} 새창에서 보기`} >{item.title}
                                    </Link>
                                    <span onClick={handelEvent} data-type={true} data-page_type="event_recruitment" data-page_id={item.id} title="삭제하기">{xMark}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className={styles.label}>
                <span className={styles.title}>interested festival</span>
                <div className={styles.wrap_box}>
                    {festArray.length === 0 ? <span className={styles.not}>관심있는 대회를 등록하지 않았습니다.</span> :
                        festArray.map(item => {
                            return (
                                <div className={styles.interested} key={item.id}>
                                    <Link className={styles.link} href={`/festival-recruitment/${item.id}`} target="_blank" title={`${item.title} 새창에서 보기`} >{item.title}
                                    </Link>
                                    <span onClick={handelEvent} data-type={true} data-page_type="festival_recruitment" data-page_id={item.id} title="삭제하기">{xMark}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </form>
    )
}