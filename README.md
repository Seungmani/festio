# 콘서트 정보 검색 웹 사이트 festio
[노션 링크](https://www.notion.so/e273980c10414efdb62e0667822771bb?d=748129315fa941b3bbd851a87e1df232)

## 기술 스택
[![React](https://blog.mindgrub.com/hubfs/Blog_Images/Thumbnail-React-Native-Blog.jpeg)(image.png))](https://reactjs.org)
[![TypeScript](https://user-images.githubusercontent.com/52682603/138834262-a7af2293-e398-416d-8dd3-ff5fab8cb80d.png)](https://www.typescriptlang.org)
[![Redux-Query](https://user-images.githubusercontent.com/52682603/138835731-e0e727ad-0bd1-44ca-a3b3-98c4d1b89c20.png)](https://redux.js.org)
[![Emotion](https://user-images.githubusercontent.com/52682603/138834258-c4b4a706-3a7e-40c8-8a08-c0ac4815d7e0.png)](https://tailwindcss.com)


## 폴더 구조
```text
/src
-/components
-- common = 컴포넌트에서 공통으로 사용
-- Header
-- Login
-- Register
-- Main
-- DetailPage
-- UserProper
-- Mypage

-/redux
-- store
-- userSlice
-- filterSlice
-- apiDataSlice

-/router
-- Router

-/ hooks
-- validate
-- fetchData

-/ pages
-- Login
-- Register
-- Main
-- ConcertInfo
-- UserProper
-- Mypage
```

## 커밋 규칙
1-1. 코드 관련
```bash
feat: 기능 개발 및 기능 수정
layout: html, css 관련 커밋
fix: 기존에 작성된 코드 오류 개선 혹은 버그 패치
refactor: 기존 코드 구조 개선
etc: 주석 추가, 코드 살짝 변경 등 영향을 미치지 않는 수정
```

1-2. 기타 작업 관련
```bash
docs: 문서 수정 
test: test 작업 개발 및 수정
conf: 환경설정 수정
build: 빌드 관련
```
1-3. 파일 관련
```bash
rename: 파일 이름 및 변수명 변경
delete: 파일 삭제
move: 파일 위치 이동
```
1-4. 플랫폼 및 라이브러리 추가
```bash
add: 개발 편의성, 새로운 라이브러리 등 도입
```