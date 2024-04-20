import fetchFestival from '../../../api/database/notion/festival';
import styles from './page.module.scss';


export default async function festival({ params: { id } }) {
    const response = await fetchFestival(id);

    return (
        <div className={styles.section}>
            {response}
        </div >
    )
}