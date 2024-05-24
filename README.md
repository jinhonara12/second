* 유지보수
   - api 불러오는 부분 구분하여 로딩 속도 줄이기
      . (24년 5월 21일) 마이페이지 페이지 구분하여 api호출 최소화
      . (24년 5월 23일) node fs모듈을 활용하여 정적 데이터를 json파일로 작성하여 api 호출을 줄임
      . ⭐️ 추가적인 속도 개선 방안 모색
   - (24년 5월 21일) loading.js 개선
      . 움직임 동작 넣어서 유저 경험 개선 필요
   - (24년 5월 24일) 문의 확인(구글폼) 네이버 메일과 연동 완료

   - 에러 페이지 UX보완
      . 오류도 긍정적인 요소로 만들어보기
      . (24년 5월 24일) 404(not_found) 페이지 수정
   - 모바일과 태블릿 / pc 반응형 디자인 확인하기
   

-----------------------

* 추가 기능
   - 추후 알림 동의 회원 대상으로 관심 행사 및 대회 신청 카카오톡으로 알림
   - 타켓층 대상의 분류 및 추천
   
   - 리스트 내 페이지네이션 필요
   - 데일리 디제이는 메인에는 주간
   - 월간은 별도 페이지
   - 커뮤니티 페이지는 오픈 채팅방
   - 원데이 페이지는 별도로 개발
   - 로그인 시 000님 환영합니다.
   - 마이페이지 내 뱃지(칭호) 삽입
   - export meta 페이지 내 구분
    . 마이페이지는 색인되지 않도록 설정
   
   - 데이터베이스 api 불러오는 부분 개선 필요
    . 데이터베이스 <-> 노션 api으로 구분

   - 페이지 로딩 개선
    . csi 수정 필요

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