# peaceful twitter regexp
평화로운 트위터 타임라인을 위한 정규 표현식

### Pre-built 정규표현식
PREBUILT.md 에 미리 만들어진 All-in-One 정규표현식이 있음.

### 요구사항:
NodeJS 4.x 이상. 6.x 에서 테스트함.

### All-in-One 정규식 생성

```
npm start
```

### 테스트

```
npm install --dev
npm test
```

### 디렉토리 구조

#### regexp_filters
정규표현식 문자열과 테스트 케이스, 설명이 JSON 형식으로 저장되어 있음.

JSON 포맷은 다음과 같음
```
{
    "description": "정규표현식 예제",
    "regexp_str": "Hello*",
    "test": {
        "should_filter": ["Hello", "Helloooo"],
        "should_pass": ["Hell"]
    }
}
```

#### test
Mocha 와 Chai 를 이용한 정규표현식 테스트 코드
