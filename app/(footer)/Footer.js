import Link from 'next/link';
import styles from './footer.module.scss';

export default function Footer() {
    return (
        <div className={styles.footer}>
            <p>데일리 스윙은 기존 스윙씬에서 다양하게 진행되는 강습과 대회, 행사 등에 대한 정보를 하나로 취합하여 제공하기 위해서 운영하고 있습니다. 현재 베타버전으로 제작 되었으며, 홈페이지 소개는 <Link href="/about">여기</Link>로 이동하여 확인할 수 있습니다.</p>
            <p>데일리 스윙의 정보는 카페나 sns의 내용을 취합하여 작성하고 있습니다. 보다 빠른 업데이트를 원하는 정보 및 문의사항은 구글폼 <a href={process.env.GOOGLE_DATA_FORM} target="_blank">링크</a>로 이동하여 작성 해주시면 됩니다.</p>
        </div>
    )
}