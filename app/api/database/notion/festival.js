import { Client } from '@notionhq/client';
import styles from '../../../(recruitment)/festival-recruitment/[id]/page.module.scss';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function festival(id) {
    const blockId = id;

    const title = (await notion.blocks.retrieve({ block_id: blockId })).child_page.title;
    // Get block children
    const response = await notion.blocks.children.list({ block_id: blockId });
    const data = response.results

    // Extract main image URL
    const mainImgUrl = data.find(item => item.type === "image")?.image.file.url || '';

    // Filter and process text blocks
    const textBlocks = data.filter(item => ["heading_3", "bulleted_list_item", "numbered_list_item", "callout"].includes(item.type));

    const pairedTextBlocks = textBlocks.reduce((acc, currentItem, i, arr) => {
        if (currentItem.type === "heading_3") {
            const title = currentItem.heading_3.rich_text[0].plain_text;
            const textArray = [];
            let nextItem = arr[i + 1];

            while (nextItem && (nextItem.type === "bulleted_list_item" || nextItem.type === "numbered_list_item" || nextItem.type === "callout")) {
                if (nextItem.type === "bulleted_list_item") {
                    textArray.push(nextItem.bulleted_list_item.rich_text.map(text => text.plain_text).join(""));
                } else if (nextItem.type === "numbered_list_item") {
                    textArray.push(nextItem.numbered_list_item.rich_text.map(text => text.plain_text).join(""));
                } else if (nextItem.type === "callout") {
                    textArray.push(nextItem.callout.rich_text.map(text => text.plain_text).join(""));
                }
                i++;
                nextItem = arr[i + 1];
            }

            if (textArray.length > 0) {
                if (acc.length === 0) {
                    acc.push({ title, href: textArray });
                } else {
                    acc.push({ title, text: textArray });
                }
            }
        }
        return acc;
    }, []);


    return (
        <div className={styles.detail_box}>
            <img className={styles.img} src={mainImgUrl} loading="lazy" />
            <h1 className={styles.title}>{title}</h1>
            {pairedTextBlocks.map(item => {
                return (
                    <div className={styles.detail} key={item.title} >
                        <p className={styles.detail_title}>{item.title}</p>
                        <div className={styles.detail_text_box}>
                            {
                                item.text ? item.text.map((text, index) => {
                                    return <span className={styles.detail_text} key={index}>{text}</span>
                                }) : item.href.map((href, index) => {
                                    const title = href.split(' : ')[0];
                                    const link = href.split(' : ')[1];
                                    return <a className={styles.detail_link} href={link} key={index} target="_blank">{title} <img src="/icons/link_24px.png" /></a>
                                })
                            }
                        </div>
                    </div>
                )
            })}
        </div >
    );
}