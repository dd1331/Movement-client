# movement

Nestjs와 Vuejs를 활용한 커뮤니티 사이트(모바일 우선, 웹 UI 추후 적용)

## Obstacles

- **CI/CD** - 최초 배포시도는 AWS Lightsail에 했으나 실행시 로그 하나 없이 hang이 걸려 버리는 상황이 발생하였고 환경 자체를 배포할 수 있는 도커를 활용하기로 결정. 인강 시청 후 Elasticbeanstalk, RDS, Trevis, Docker 활용하여 테스트 완료 후 도커허브에 빌드 이미지 전송까지 성공했으나 aws ebs에서 시작 실패. 로그에서 명확한 원인이 파악되지 않아 heroku에 배포. 관련 지식 더 쌓은 후 재시도 필요

- **테스트코드** - 처음엔 이렇게 저렇게 테스트 코드를 작성해보았으나 진행이 더뎌지고 수정사항이 생길 때마다 같이 테스트 코드를 수정해야 하는 상황이 발생하여 중단하였다. CI/CD를 위한 테스트에 활용이 전혀 불가능했다. 배포전 확인을 위한 최소한의 테스트 코드 적용과 제대로된 TDD 학습 필요


## Features
- [x] 해쉬태그
- [x] 게시글 무한스크롤
- [x] 게시글/댓글/대댓글 좋아요
- [x] 글 작성/수정/삭제
- [x] 이미지 업로드
- [ ] 댓글 작성/수정/삭제
- [x] 로그인/로그아웃
- [x] 게시글 크롤링
- [x] 뉴스 RSS
- [x] 추천글(좋아요)
- [x] 인기글(조회수)
- [x] 전체검색
- [ ] 회원정보 조회/수정
- [x] 대댓글 더보기
- [x] 실시간 해쉬태그 순위
- [ ] 회원탈퇴
- [x] 캐싱
- [ ] 사용량 제한
- [ ] 테스트코드
- [ ] CI/CD
- [ ] 부하테스트
## Tech
* TypeScript
* TypeORM
* Nest.js
* Passport.js
* Amazon S3
* Jest.js
* Mysql
* Cheerio
* Axios
* Multer
* Redis
* Vue.js
* Vuex
* Axios
