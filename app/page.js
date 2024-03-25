import styles from "./page.module.css";
import InternalLink from "./InternalLink"


export default function Home() {
  return (
    <>
      <InternalLink href={"/lib/database"} text="/lib/databse" />
      <br />
      <InternalLink href={"/api/database"} text="/api/databse" />
      <br />
      <InternalLink href={"/club"} text="/club" />
      <br />
    </>
  )
}
