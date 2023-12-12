# AlbaOn
<div align=center>

# <b>AlbaOn</b><p style="font-weight: 100; font-size: 17px">2023-11 MINI PROJECT</p>

<a href="#getting-started">Getting Started</a> •
<a href="#Introduction">Introduction</a> •
<a href="#function">functions</a> •
<a href="#stack">Stack</a> •
<a href="#contributors">Contributors</a> •
<a href="#backend-repo">Backend repo</a> •

</div>

> 소규모 사업장 관리플랫폼 <br>
> 개발기간: 2023.11.09~2023.12.08

<br>
<br>
<div id="getting-started">

## ⏸️ 시작하기

</div>
<div align="center">

<h3>

**[AlbaOn 바로가기](http://ec2-3-35-58-201.ap-northeast-2.compute.amazonaws.com/)**

</h3>

모두를 위한 알바온

</div>
<br>

<div id ="Introduction">

## 👊🏻 프로젝트 소개

</div>

<div align="center">
<br>

<p>
1. [포스코X코딩온] 사업장 내 근로자들의 스케쥴을 조정합니다.
</p>

<p>
2. 근로자는 자신의 출퇴근을 요청하고 그에 따른 급여를 확인할 수 있습니다.<br>
사업자는 근로자들 개인의 근퇴내역과 급여내역을 확인할 수 있습니다.!
</p>

<br>
<br>
</div>

<div id="function">

## 💡 진행 및 기능 소개

<div align="center">
플로우차트
<br>
<br>
<img width="1153" alt="KakaoTalk_Photo_2023-12-12-16-49-10" src="https://github.com/applicants-backend/KDT_FNProject/assets/137901354/e3c88254-ec43-40f5-ab4b-5c8c2158593f">

<br>

와이어프레임
<br>
<br>
<img width="3047" alt="Section 2" src="https://github.com/applicants-backend/KDT_FNProject/assets/137901354/6380f067-261c-4084-8291-74d588a30321">

</div>

<br>
<br>


<div align="center">
[영상]
</div>

<br>
<br>
<br>

<div id="stack">

## 🔨기술 스택

</div>                                
 <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
                                                                                         
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white"><img src="https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white" /><br><img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"><img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">

<h2>🔥 서버 구현 사항</h2>
<h3 align="center">AWS RDS</h3>
<h4>1. 리전(ASIA/seoul)</h4>
 <h4>2. 파라미터 그룹 생성</h4>
✅time/zone 설정 (ASIA/seoul)<br>
 <h4>3. 네트워크 인바운드 규칙 설정 (MYSQL/Aurora)</h4>
 <h4>4. MySQL Schema 생성(UTF-8/general)</h4>
 <br>
 <h3 align="center">AWS EC2, Nginx</h3>
 <h4>1.EC2 설정</h4>
  ✅ 네트워크 인바운드 규칙설정(80,443)<br>
  ✅ 동적 IP 할당<br>
  ✅ 리전(ASIA/seoul)<br>
  <h4>2.EC2에 Nginx 웹서버 설치</h4>
 ✅ opjdk 17.0.9설치<br>
 ✅ Nginx error log 설정<br>
 <h4>3.EC2에 Nginx configuration 파일 작성</h4>
✅ 이미지 요청 관련 이미지 크기 설정<br>
✅ HTTP(80) 요청에 대한 proxy pass설정<br>
  <h4>4. Spring boot YAML 작성</h4>
✅ 프로젝트 서버 port설정<br>
 ✅ database connect 설정 (Local Mysql, AWS RDS)<br>
 ✅ JPA Hibernate SQL default 설정<br>
 <h4>5. AWS EC2에 jar파일 배포</h4>
 ✅ nohup를 사용하여 jar 무중단 배포<br>
<br>
 <br>
 <br>
 <h2>🔥  기능 구현 사항</h2>
 <h3 align="center"> :위를_가리키는_손_모양_2: 주요기능</h3>
<h4>회원관련 기능<h4>
<h5>역할군에 따른 회원가입 기능</h5>
 ✅  기본정보는 인증을 위한 이메일, 아이디, 비밀번호, 이름 이때 비밀번호는 데이터베이스에 암호화하여 저장.<br>
 ✅  Admin -  추가적으로 사업자이름,사업자번호 <br>
 ✅  User -  해당 사업장의 admin이 발행한 인증코드를 적어 유효한지 판단 후 가입승인. <br>
 ✅  아이디와 비밀번호로 로그인 기능 <br>
 ✅  회원가입 외에 기능은 로그인과 jwt토큰 인가과정 필요 <br>
 ✅  인증메일을 통한 비밀번호 찾기 기능 <br>
<h3 align="center">:v: 메인기능</h3>
<h4>캘린더를 이용한 스케줄관리 기능</h4>
<h5>Admin</h5>
 ✅ 해당사업장의 User 전체 근무자 목록을 GET.<br>
 ✅  캘린더에서 해당요일을 누르고 근무자, 근무시간, 시급을 입력하고 저장.<br>
<h5>User</h5>
 ✅  캘린더에서 본인일정과 타 User들의 일정을 GET.<br>
 ✅ 캘린더에서 출근과 퇴근버튼을 통해 근무시간을 기록한다.<br>
 ✅  퇴근버튼을 누를 시 오늘 출근한 기록이 있는지 조회.<br>
<h4>근태관리에서 근태및 데이터 조회 기능</h4>
<h5>Admin</h5>
 ✅ 모든 User의 출근 및 퇴근기록 GET. <br>
 ✅  모든 User의 월별 근태 분석 데이터를 GET.<br>
 ✅  퇴근처리가 되어야 승인 버튼 활성화<br>
 ✅  승인 버튼을 누르면 근무시간과 시급을 통해 오늘 하루의 급여를 계산 후 급여데이터에 UPDATE <br>
<h5>User</h5>
 ✅  해당 User의 출근 및 퇴근기록 GET. <br>
 ✅  해당 User의 월별 근태 분석 데이터를 GET. <br>
<h4>급여관리에서 월급및 데이터 조회 기능</h4>
<h5>Admin</h5>
 ✅  데이터베이스에서 모든 User의 급여데이터를 GET. <br>
 ✅  데이터베이스에서 월별 급여 분석 데이터를 GET.  <br>
<h5>User</h5>
 ✅  데이터베이스에서 모든 User의 급여데이터를 GET. <br>
 ✅  데이터베이스에서 월별 급여 분석 데이터를 GET. <br>
<h4>업무관리에서 투두리스트 및 댓글 기능</h4>
<h5>Admin</h5>
 ✅ 데이터베이스에서 모든 업무리스트데이터를 최신순으로 GET. <br>
 ✅ 업무일지, 근무일지 생성 및 수정 삭제기능 <br>
 ✅ 업무 체크리스트 생성 및 업데이트 기능 <br>
:흰색_확인_표시: 댓글쓰기 기능 <br>
<h5>User</h5>
 ✅ 데이터베이스에서 모든 업무리스트데이터를 최신순으로 GET. <br>
 ✅ 체크박스 클릭시 누가 클릭했는지 표시되는 기능 <br>
 ✅ 댓글쓰기 기능 <br>
<br>



<br>

## 📘Convention

- [**develop convention**](https://trello.com/b/w3NlKj5m/%EC%86%8C%EA%B7%9C%EB%AA%A8%EC%97%85%EC%9E%A5%EC%A7%81%EC%9B%90%EA%B4%80%EB%A6%AC)
- [swagger ui](http://ec2-3-39-203-178.ap-northeast-2.compute.amazonaws.com/swagger-ui)

<br>

<div id=contributors>
 
## 🙋‍♀️Contributors

</div>

| <img src="https://github.com/applicants-backend/KDT_FNProject/assets/137901354/698bf719-1fe9-4697-ae65-0cdc0ef15518" width="150px" /> | <img src="https://github.com/applicants-backend/KDT_FNProject/assets/137901354/8a8938d4-d987-4c67-9ab5-5b6ede2d23bf" width="150px" /> |
| :------------------------------------------------------------------------------: | :------------------------------------------------------------------------------: |
| FE: [김민현](https://github.com/applicants-backend) | FE: [차두환](https://github.com/chaduhwan) |



<br/>

<br />

<br />

<div id="backend-repo">

## 백엔드 REPOSITORY

</div>

**[`AlbaOn-BACKEND 레포지토리`](https://github.com/kangseokjooo/Albabackend)**

AlbaOn의 백엔드 레포지토리 입니다.
<h2>👨🏻‍💻 contributors</h2>
<div id="contributors">
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/EndBug"><img src="https://github.com/kangseokjooo/Albabackend/assets/102424773/475b4b2a-268c-4ff3-8acd-45c7d621236c" width="100px;" alt="kang"/><br /><sub><b>강석주</b></sub></a><br /></td>
      <td align="center" valign="top" width="14.28%"><a href="https://olets.dev"><img src="https://github.com/kangseokjooo/Albabackend/assets/102424773/e4afa1c4-7b09-4609-924e-8c820e9487b1" width="100px;" alt="justin"/><br /><sub><b>정인근</b></sub></a><br /></td>
      <td align="center" valign="top" width="14.28%"><a href="https://hsyoonhs.github.io"><img src="https://github.com/kangseokjooo/Albabackend/assets/102424773/8486735e-0064-470a-a43b-5d2dd352a3c9" width="100px;" alt="chan"/><br /><sub><b>최영찬</b></sub></a><br /></td>
    </tr>
  </tbody>
</table>
</div>

## 폴더 구조

```
📂 src
┣ 📂 api
┣ 📂 assets                   # 폰트, 이미지 ,아이콘
┃  ┣ 📂 images
┃  ┣ 📂 fonts
┣ 📂 components               # 공용 컴포넌트
┃  ┣ 📂 Modal
┃  ┣ 📂 SideBar
┃  ┣ ...
┣ 📂 constant
┣ 📂 hooks                    # 커스텀훅
┣ 📂 pages                    # 페이지 컴포넌트
┃  ┣ 📂 Home
┃  ┣ 📂 GroupChatList
┃  ┣ 📂 Login
┃  ┃  ┣ LoginBox.tsx
┃  ┃  ┣ index.tsx
┃  ┣ ...
┣ 📂 routes
┣ 📂 utils
┣ 📂 states                   # 전역상태
┣ 📂 styles                   # 스타일테마
┣ 📂 @types                   # 타입스크립트 공용 인터페이스
┣ App.tsx
┣ index.tsx

```

## 기타 규칙

```
- 컴포넌트들은 기본적으로 PascalCase(대문자 시작) 제작
- 상수화 파일 제외 모든 변수, 함수명은 camelCase로 시작
- scss는 같은 파일 내에 기재
```
