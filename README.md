# ASDL · AI Semiconductor Driving Laboratory

**Photonic devices and advanced packaging for AI semiconductors, from materials to systems.**

Hanyang University ERICA, School of Semiconductor Convergence Engineering
PI: Prof. Younghyun Kim (김영현) · younghyunkim@hanyang.ac.kr

Website: **https://yh2424.github.io**

ASDL은 AI 반도체 광통신, Co-Packaged Optics(CPO), 집적광학을 연구합니다. 대표 연구는 유리 기판 위 실리콘 나이트라이드 플랫폼 **SING(SiN-on-Glass)**으로, 광 재배선층(Optical RDL), 광섬유·유리·PIC 사이의 광 결합, 모듈레이터와 스위치 같은 광소자를 하나의 패키지로 통합합니다. 이 밖에 Si PIC용 고속 광 모듈레이터(III-V/Si, SiGe, MRM), 차세대 메모리(FeFET, FeDRAM), 디스플레이 소자(QD-LED, micro-LED)를 연구합니다.

---

## 사이트 구성

| 페이지 | 파일 | 내용 |
|---|---|---|
| Home | `index.html` | 첫 화면 사진 순환, SING 대표 연구, 기타 연구, 시설, 최신 소식 |
| Research | `research.md` | SING 상세, Si PIC·메모리·디스플레이 연구, 시설, 협력 기관 |
| Team | `team.md` | 구성원 (마크다운을 화면에서 카드로 표시) |
| Publication | `publication.md` | 저널, 특허, 학회 목록 (연도별 목차 자동 생성) |
| News | `news/index.html` + `_posts/` | 소식 목록, 12개씩 페이지 나눔 |
| Contact | `contact.md` | 연락처, 찾아오는 길 |
| Profile · CV | `people/younghyunkim.md`, `cv.md` | 교수 소개, 이력 |

## 소식(News) 올리기

`_posts/<연도>/YYYY-MM-DD-제목.md` 파일을 만듭니다.

```yaml
---
layout: post
title: 'Journal Publication - 논문 제목'   # "종류 - 제목" 형식: 앞부분이 화면 위 작은 라벨이 됩니다
thumbnail-img: /assets/img/Thumbnail/260325_publication.png   # 카드에 보일 대표 이미지
date: '2026-03-25 10:30'                  # 이 날짜가 주소(/2026-03-25-제목/)가 됩니다
author: Younghyun Kim
excerpt: >-
  목록에 보일 한두 문장 요약
---
본문 (마크다운)
```

- 종류 예시: `Journal Publication`, `Conference`, `Award`, `Magazine Feature`, `Press release`
- 썸네일 이미지는 `assets/img/Thumbnail/`에 넣고, 가로 1200px 이하로 줄여 올려 주세요.
- 최신 글 3개가 홈 화면 News에 자동으로 나옵니다.

## 구성원(Team) 수정

`team.md`는 아래 형식을 지켜 주세요. 이 구조를 읽어 카드로 바꿉니다.

```markdown
# Researcher            ← 섹션 (Principal Investigator, Researcher, Administrative staff, Alumni)

### 홍 길동, Gildong Hong   ← 이름: 첫 글자가 카드의 동그라미 글자가 됩니다
#### Integrated MS and Ph.D. course (M1), email@hanyang.ac.kr
#### 1st-authored SCIE: [[1]](링크)

---                     ← 사람 사이 구분선
```

## 논문(Publication) 추가

`publication.md`에서 해당 섹션(`# Journal`, `## PATENT`, `## Conference`)의 연도(`### 2026`) 아래에 한 줄을 추가합니다. 교수님 이름은 `**Younghyun Kim**`처럼 굵게 표시합니다. 연도 제목을 새로 만들면 왼쪽 목차에 자동으로 추가됩니다.

## 연구 내용 수정 위치

| 바꿀 것 | 파일 |
|---|---|
| SING 큰 그림과 옆 설명 (Optical RDL, Fiber-to-Glass 등) | `_includes/sing-platform.html`, 그림 `assets/img/sing/sing-platform.png` |
| 홈 SING 제목 옆 광 인터커넥트 애니메이션 | `_includes/sing-hero.html` |
| Materials → Devices → Packaging → Systems 목록 | `_includes/sing-path.html` |
| Si PIC · 메모리 · 디스플레이 연구 | `_includes/other-research.html` |
| 시설 사진과 설명 | `_includes/facilities.html` |
| 첫 화면 순환 사진 | `index.html` 위쪽 `hero-slides` 목록, 사진은 `assets/img/hero/` (가로 약 1920px) |

## 꼭 유지해야 하는 파일

- **`_mydata/CV/cv_younghyunkim.pdf`**: 외부 지원 서류에 아래 주소로 링크되어 있습니다. 파일 이름과 위치를 바꾸지 마세요. 내용을 갱신할 때는 같은 이름으로 덮어씁니다.
  `https://raw.githubusercontent.com/yh2424/yh2424.github.io/master/_mydata/CV/cv_younghyunkim.pdf`
- `_mydata/Patent/pdf/`: Publication 페이지의 특허 링크가 가리키는 파일입니다.
- `legacy/`: 예전 글 목록 주소(`/page2/` 등)를 News로 넘겨 주는 페이지입니다.

## 로컬에서 미리 보기

GitHub Pages가 `master` 브랜치를 자동으로 빌드합니다. 올리기 전에 확인하려면:

```bash
bundle install
bundle exec jekyll serve      # http://localhost:4000
```

## 스타일

- 디자인: 어두운 광학 실험실 톤(2026 리디자인). 모든 색과 글꼴은 `assets/css/asdl.css` 맨 위의 변수에서 정합니다.
- 동작: `assets/js/asdl.js` (모바일 메뉴, 첫 화면 사진 순환과 일시정지, Team 카드, Publication 목차)
- 레이아웃: `_layouts/`, 공통 부분: `_includes/nav.html`, `header.html`, `footer.html`

## Credits

This site started from [Beautiful Jekyll](https://github.com/daattali/beautiful-jekyll) by Dean Attali (MIT License) and was redesigned for ASDL in 2026. See `LICENSE`.
