# kogumo0422.github.io

Kogumo0422의 보안 공부 기록 블로그입니다. Jekyll과 GitHub Pages를 사용합니다.

- 블로그: https://kogumo0422.github.io
- 저장소: https://github.com/Kogumo0422/Kogumo0422.github.io

## 새 글 쓰기

`_posts/` 폴더에 `YYYY-MM-DD-영문제목.md` 파일을 만들고 아래처럼 작성합니다.
날짜와 제목, 본문은 실제 작성 내용으로 바꿉니다.

```markdown
---
title: "글 제목"
date: YYYY-MM-DD
categories: []
tags: []
---

여기에 글 내용을 작성합니다.
```

`main` 브랜치에 커밋하고 push하면 GitHub Pages가 배포합니다.
저장소의 Actions 탭에서 배포 결과를 확인할 수 있습니다.

## MD Push로 보안 뉴스 올리기

MD Push에서 블로그 저장소를 선택하고 **HTB 블로그 게시**를 끈 뒤, **저장소 안의 폴더**에 `_posts/security-news`를 입력합니다.

`YYYY-MM-DD-이슈이름.md` 형식으로 파일을 저장해 앱에 놓습니다. 같은 날 여러 건을 올릴 때는 이슈 이름을 다르게 지정합니다. 파일은 아래 형식으로 작성합니다.

```yaml
---
title: "이슈를 한 문장으로 요약"
source_url: "https://x.com/계정/status/게시물번호"
---
```

GitHub Pages가 배포하면 **보안 뉴스** 탭에 날짜, 한 줄 요약, X 원문 링크가 최신순으로 표시됩니다. 달력에 게시 날짜가 자동으로 표시되며, 날짜를 누르면 그날의 뉴스만 볼 수 있습니다. 같은 파일명으로 다시 올리면 기존 항목이 갱신됩니다.

## 카테고리 관리

`_config.yml`의 `category_list`에 적힌 카테고리는 글이 없어도 표시됩니다.
기본 6개 분야와 글에서 사용하는 카테고리가 함께 표시됩니다. 챔피언 선택 화면의 분야별 이미지·설명은 `_data/category_details.yml`에서 수정합니다.

## 주요 파일

- `_config.yml`: 블로그 제목, 작성자, 주소, 고정 카테고리
- `_posts/`: 게시글
- `_layouts/`: 공통 화면과 게시글 레이아웃
- `assets/css/style.css`: 스타일
- `index.html`: 메인 화면
- `categories.html`: 카테고리별 글 목록
- `about.html`: 소개
- `news.html`: 보안 뉴스 목록


## 챔피언 선택 테마

- 홈의 분야 선택 화면 아래에 기술 글 목록을 표시합니다. 기본은 전체 분야이며, 10개씩 페이지를 나눕니다. 분야를 선택하면 해당 분야 안에서 페이지가 나뉘고, `?category=분야&page=2`처럼 페이지 주소를 공유할 수 있습니다.
- 분야를 선택하면 프로필 아래 링크로 해당 글 목록에 이동할 수 있습니다. 목록의 `필터 해제`는 전체 기술 글을 다시 표시합니다.
- 오른쪽 위 터미널에서 `ls`로 공개 기술 글 제목과 `flag.txt`를 나열하고, `cat 글 제목` 또는 `cat "글 제목"`으로 해당 글을 열 수 있습니다. `cat flag.txt`, `clear`도 사용할 수 있습니다. 결과는 마지막 실행 후 15초 뒤 지워집니다.
- 챔피언 이미지는 Riot Games의 [Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon) 공식 자료를 사용합니다. 이 사이트는 Riot Games의 공식 서비스가 아닌 개인 블로그입니다.
- 화면 스타일은 `assets/css/style.css`, 분야 선택 동작은 `assets/js/champion-select.js`, 터미널 동작은 `assets/js/terminal.js`에 있습니다.

기본 스킨은 꿀잼 코그모이며 분야 선택 시 배너의 이미지와 소환사 프로필이 함께 변경됩니다. 글 목록은 Jekyll의 공개 `site.posts`에서 생성되어 새 글을 배포하면 자동으로 반영됩니다.
