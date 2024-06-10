* SEO 관련 별도로 작업 진행
   - 5월 31일(금) 01:27 시크릿 모드 기준 구글 '데일리 스윙' 검색어 14번째 노출
   - 원데이 페이지 제작과 함께 키워드 선정하여 작업 진행하기
   
   - SEO 스키마 마크업 작업
      . (24년 5월 30일) 팀 / 바 / 동호회 스키마 구조 삽입 완료
      . 구글 검색 결과 페이지 내 노출 데이터 포맷 확인

   - 구글 라이트하우스 
      . 시크릿모드 검사       로그아웃    로그인
         Performance       100
         Accessiablilty    82
         Best Practice     96
         SEO               82

--------------------------

* 유지보수
   - (24년 5월 21일) loading.js 개선
      . 움직임 동작 넣어서 유저 경험 개선 필요
   - (24년 5월 24일) 문의 확인(구글폼) 네이버 메일과 연동 완료
   - 에러 페이지 UX보완
      . (24년 5월 24일) error 페이지 수정
      . (24년 5월 24일) 404(not_found) 페이지 수정

   - api 불러오는 부분 구분하여 로딩 속도 줄이기
      . (24년 5월 21일) 마이페이지 페이지 구분하여 api호출 최소화
      . (24년 5월 23일) node fs모듈을 활용하여 정적 데이터를 json파일로 작성하여 api 호출을 줄임
      . (처리완료) 좋아요 표시 가능한 모집 페이지 api 구조 및 호출 데이터 개선필요
      . (24년 6월 1일)🔥 mypage / member api 내 api호출 중복 개선
      . (24년 6월 2일) 모집 관련 좋아요 표시되는 부분에서 누락되는 요소가 생김. SessionProvider를 페이지 전체에 씌움
     
      . weekly => 모든 강습을 불러와서 서버시간 필터링 / api 자체에서 필터링해서 가져오고 있음.
         -> 클라이언트에서 노션 api로 필터링하여 호출할 수 있는 페이지 찾아서 개선 필요.
      
      . ⭐️ 추가적인 속도 개선 방안 모색 필요 -> vercel에서 제공하는 데이터베이스 사용 활용해보기
         -> 노션api를 호출하고 응답 받는데 걸리는 시간이 있음
      
      . 🔥 100개 이상의 데이터 호출 시 페이지네이션을 통해서 추가 요청하는 형태 작업 필요
         -> next_cursor: 'f8228fa7-a608-4586-b709-2e60f02cf9aa',
         -> has_more: true

      . (24년 6월 7일) 종료된 행사 대회 워크샵 강습은 별도로 저장하여 [종료] 항목으로 리스트 나열
         -> 모집 종료되면 그때마다 매번 npm run update 해야 [종료] 항목에서 확인 가능
            . vercel.json으로 cron 작업은 제대로 안되고 있음. 자꾸 자동배포가 실패함
            . 🔥 github action 사용하는 중 -> push 부분에서 실패
         -> 월별 / 각종 행사 나열 캘린더 만들어야할듯..
   
   - 모바일과 태블릿 / pc 반응형 디자인 확인하기
   
   - error / not_found 페이지 내 내부 링크 삽입하기 및 에러 상세 안내

   - 💬 데이터베이스 필터 및 정렬 기능에 대해서 지금은 서버에서 api로 데이터를 불러오기 때문에 client에서 정렬하거나, 필터링도 불러온 데이터 내에서 정리해야함..

-----------------------

* 추가 개발 건
   - 1. (완료)수상
      . (24년 5월 29일) 마이페이지 내에서 수상 연동
         ⭐️ api 호출 주의해서 데이터베이스 구조 확인
      . (24년 5월 29일) 멤버 <-> 대회를 연결해야함
         멤버 대회 모두 api호출 필요
         대회가 필요한 건 연도 및 page_id만 필요함 => 이건 정적 데이터로 생성하는게 나을듯 대회
         -> awards에서 생성 및 멤버(page_id)랑 대회(page_id)삽입하여 멤버랑 연동
      . (24년 5월 29일) 모바일 반응형 작업
      . (24년 5월 31일) 공개용 리스트 페이지 작업
      . (24년 6월 4일) 닉네임 검색하여 api호출하는 서칭 작업(필요시 항목별 검색 추가)

   - 2. 채팅 커뮤니티 기능
      . 웹소켓 기능 확인해보기
      . 게시판 형태의 커뮤니티를 노션 api로 활용 

   - 3. 원데이 홍보 페이지

   - 4. 소셜 캘린더 페이지
   
   - 5. 카카오톡 알림 기능
      . 추후 알림 동의 회원 대상으로 관심 행사 및 대회 신청 카카오톡으로 알림
      . 관심있는 행사/대회 7일 전, 얼리버드 신청 등.
         -> 추후 행사 대회에서 니즈가 있을 경우 진행
         -> 실제 유효고객이 많아지면 진행

   - 6. 서치기능
      . 검색 상세페이지를 어디까지 검색할 것인지.
      . 개별 페이지 검색 또는 전체검색.

   - 기타
      . 타켓층 대상의 분류 및 추천
      . 마이페이지 내 뱃지(칭호) 삽입
      . 연간 대회 공식 사이트(홈 / 인스타 / 페북) 리스트 페이지

-----------------------

제작 개요
1. next로 페이지 제작
 - create-next-app로 초기화
    . next 문서 습득하며 기본 구조 확인

2. .env 환경변수 확인
 - 노션 api키 생성 및 저장
 - 데이터베이스 링크 공개 및 아이디값 저장 

3. notion query로 데이터 가져오기 확인
 - 개발환경을 위해서 폴더 구조 구분

4. 내부 페이지 이동
 - <Link> 컴포넌트를 사용

5. /lib/database 디렉토리에 만들어둔 notion 데이터 가져오기
 - 출력 페이지에서 데이터 import해서 가져오기
 - 정적페이지 club 페이지 (완료)

6. CSS 조작법 습득
 - scss 사용법 확인
 - .module.css 사용법 확인

7. 페이지 제작
 - 헤더
 - 사이드 네비
    . usePathname 클라이언트 컴포넌트 사용
 - 홈 / 어바웃 / 클럽 소개 페이지 우선 작업 진행
    . 홈 메인 페이지 레이아웃(완료)

8. 노션 데이터
 - Promise.all()을 사용하여 불러온 노션 데이터 값을 가지고 바로 노션 api호출하여 값 가져오기
 - (24년 4월 3일) Recently News 가져오는 데이터 값 수정

9. 라우터
 - (24년 4월 3일)괄호를 통해서 라우터 묶어서 경로 구성

10. 로그인 기능 확인
 - (24년 4월 7일)카카오 api로 회원가입 동의 확인
    . 토큰값 가져오기
    . 토큰값으로 유저값 가져오기
 - (24년 4월 7일)카카오 회원가입을 통한 노션 데이터베이스 생성 및 연동 완료
    . 유저 카카오 아이디값(고유값)으로 조건문 생성하여 노션 데이터베이스 생성

11. next-auth를 사용한 카카오 api 로그인
 - (24년 4월 15일)문서 확인 및 소스 구현 테스트 중
    . package.json 내 type : module 삭제 / 정상 작동
 - (24년 4월 16일)기존 카카오api 함수와 연동 완료
    . 노션 / 카카오 / next-auth의 꼬리를 물고 연결됨
    . 변수별 타입을 미리 설정하는 타입스크립트가 필요성

12. 마이페이지 제작
 - useSession 을 통해서 개별 데이터를 마이 페이지로 가져오기
 - next의 라우트 route.js 파일을 사용하여 서버 handler 함수 작성하기
 - (24년 4월 20일) 페이지 제작 완료
    . 클라이언트(홈페이지) <-> 서버 <-> 데이터베이스(노션) 로컬 연동 완료 

13. 서브페이지 제작
 - (24년 4월 21일) 행사 / 대회 서브페이지 제작
    . 동적 라우팅으로 페이지 모두 동일한 형태로 제작
    . 노션 block 형태를 단순하게 작성하여 반복문으로 가져와서 정적 페이지 생성

14. 마이페이지 추가
 - (24년 4월 22일) 스윙 시작 시기 기입

15. 리스트 페이지 제작(예정)
 - (24년 4월 22일) club 페이지 완료
 - (24년 4월 24일) 메인 / 위클리 뉴스(1주일 치 정리)
 - (24년 5월) bar, team 페이지 완료
 - (24년 5월 7일) about 페이지 완료
 - (24년 5월 9일) 강습모집 페이지 완료
 - (24년 5월 9일) 팀모집 / 워크샵모집 페이지 완료
 - (24년 5월 10일) 행사 / 대회모집 페이지 완료
   . [좋아요] 기능 서버 데이터 주고 받는 부분 완료

16. SEO 관련
 - (24년 5월 10일) 메타태그 입력왑료
 - (24년 5월 10일) next-sitemap 설치 및 설정

17. 반응형 작업
 - 반응형 작업 진행
  . (24년 5월 17일) 메인 웹 모바일 반응형 작업 완료
  . (24년 5월 17일) 메인 메뉴 모바일 반응형 작업 완료 / 그리드 속성 사용 완료
  . (24년 5월 20일) 마이페이지 반응형 작업 완료

18. 호스팅 업체 확인
 - 서버리스로 진행
   . firebase, cloudflare, vercel 서버 확인하기

19. 푸터 영역 삽입
 - (24년 5월 14일) 베타 버전 설명 내용으로 완료