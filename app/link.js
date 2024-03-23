import Link from 'next/link';

export default function linkTag({ href, text }) {
    return (
        <Link href={href}>{text}</Link>
    )
}