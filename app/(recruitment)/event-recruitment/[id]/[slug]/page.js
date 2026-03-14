import fetchEvent from "../../../../api/database/notion/event"
import styles from "./page.module.scss"

export const generateMetadata = async ({ params, searchParams }) => {
    return {
        title: `${decodeURIComponent(params.slug)} | ${searchParams.classification}`,
    }
}

export default async function event({ params: { id } }) {
    const response = await fetchEvent(id)
    return <div className={styles.section}>{response}</div>
}
