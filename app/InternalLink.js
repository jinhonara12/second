import Link from 'next/link';

export default function InternalLink({ href, text }) {
    return (
        <Link href={href}>{text}</Link>
    )
}