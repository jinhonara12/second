/**
 * Notion API databases.query의 100개 페칭 제한(Pagination)을 해제하기 위해
 * has_more가 false가 될 때까지 순회하여 전체 결과를 배열로 반환하는 공통 헬퍼 함수
 */
async function queryAllDatabasePages(notion, queryParams) {
    let results = [];
    let hasMore = true;
    let cursor = undefined;

    while (hasMore) {
        const params = { ...queryParams };
        if (cursor) {
            params.start_cursor = cursor;
        }

        const response = await notion.databases.query(params);

        if (response.results && response.results.length > 0) {
            results.push(...response.results);
        }
        hasMore = Boolean(response.has_more);
        cursor = response.next_cursor;
    }

    return results;
}

module.exports = { queryAllDatabasePages };
module.exports.default = queryAllDatabasePages;
module.exports.queryAllDatabasePages = queryAllDatabasePages;
