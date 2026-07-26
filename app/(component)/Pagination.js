'use client';

import styles from './Pagination.module.scss';

export default function Pagination({ currentPage, totalPages, onPageChange, pageWindow = 3 }) {
    if (!totalPages || totalPages < 1) return null;

    // 1. 현재 페이지를 중심으로 앞뒤로 보여줄 범위를 계산합니다.
    // pageWindow가 3일 때, 현재 페이지 양옆으로 1개씩(총 3개) 보여주도록 설정합니다.
    const halfWindow = Math.floor(pageWindow / 2);

    let startPage = currentPage - halfWindow;
    let endPage = currentPage + halfWindow;

    // 2. 시작 페이지가 1보다 작아지면 범위를 보정합니다.
    if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(pageWindow, totalPages);
    }

    // 3. 끝 페이지가 전체 페이지를 벗어나면 범위를 보정합니다.
    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, totalPages - pageWindow + 1);
    }

    // 4. 계산된 범위를 바탕으로 페이지 번호 배열을 생성합니다.
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className={styles.pagination_container} aria-label="페이지 이동 네비게이션">
            <button
                className={styles.nav_btn}
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                title="첫 페이지로"
            >
                ⏪️
            </button>
            <button
                className={styles.nav_btn}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                title="이전 페이지"
            >
                ◀️
            </button>

            <div className={styles.page_numbers}>
                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        className={`${styles.page_btn} ${currentPage === page ? styles.active : ''}`}
                        onClick={() => onPageChange(page)}
                        aria-current={currentPage === page ? 'page' : undefined}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                className={styles.nav_btn}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                title="다음 페이지"
            >
                ▶️
            </button>
            <button
                className={styles.nav_btn}
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                title="마지막 페이지로"
            >
                ⏩️
            </button>
        </nav>
    );
}
