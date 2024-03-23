import styles from "./page.module.css";
import Link from "./link"


export default function Home() {
  return (
    <>
      <Link href={"/lib/database"} text="/lib/databse" />
      <br />
      <Link href={"/api/database"} text="/api/databse" />
      <br />
      <Link href={"/club"} text="/club" />
      <br />
    </>
  )
}
