import fetchEvent from '../../../api/database/notion/event';
import styles from './page.module.scss';


export default async function event({ params: { id } }) {
    const response = await fetchEvent(id, styles);
    return (
        <div className={styles.section}>
            {response}
        </div>
    )
}