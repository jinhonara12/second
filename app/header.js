import Link from "next/link";



function Header() {
    return (
        <>
            <nav>
                <Link href="/">home</Link>
                <Link href="/about">about</Link>
                <Link href="/club">club</Link>
            </nav>
        </>
    )
}


export default Header