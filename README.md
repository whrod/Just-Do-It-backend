# 37-1st-Just-Do-It-backend

1. 팀 소개
Just Do It - nike.co.kr clone project    
  프론트엔드 : 이승훈, 이승윤, 이유진, 박영태<br>
  백엔드 : 조경찬, 배규남, 정윤아<br>
  개발기간 : 2022/9/19 ~ 2022/9/30

2. 서비스 소개    
전세계 대표 스포츠 의류 브랜드 나이키의 온라인 쇼핑몰을 모티브하여 커머스 사이트 기능 학습   
나이키 상품 리스트 (필터 & 정렬)   
회원 비회원 구분하여 사이트 플로우 이용   
위시리스트 기능 구현   
장바구니 기능 구현   
제품페이지, 장바구니페이지, 옵션 변경 페이지에서 구매 기능   

  
- 2주동안 진행하는 첫 프로젝트로 기획 부분을 제하고 학습에 필요한 주요 기능 구현에 집중했습니다.
- 아래 영상은 사이트 이용 플로우대로 녹화하였으며 백엔드와 실제로 통신됩니다.
- https://www.youtube.com/watch?v=7PEgky67nF4<br>
  
3. 적용 기술    
Front-End : React.js, SCSS<br>
Back-End : Node.js, Express, JSON WEB TOKEN, Bcrypt, Mysql, AWS(RDS)<br>
공통 : RestFul API<br>

4. DB modeling
![Copy of Copy of Copy of Copy of Untitled Diagram (1)](https://user-images.githubusercontent.com/105476777/193579993-ae2b0068-7215-4f86-828c-a29bdb280efe.png)

5. 필수 구현 사항 (백엔드)
- 메인 & 제품 리스트 페이지에서 가격순, 릴리즈순, 할인순, 리뷰 순으로 정렬 / 사이즈, 컬러, 브랜드 별로 필터<br>
- 회원가입 & 로그인 (회원가입 : 정규표현식에 따른 예외핸들링, 14세 이상만 회원가입 가능 / 로그인 : bcrypt(compare), jwt 발급)<br>
- 상세페이지 (로그인, 비로그인에 따른 위시리스트 노출, 리뷰와 함께 노출)<br>
- 위시리스트 (CRD)<br>
- 장바구니 (CRUD) & 옵션변경에서 상세페이지 (R, API)<br>
- 구매하기 (orders 테이블 부재로 재고 관리만, 장바구니 구매시 카트 삭제(transaction)<br>

6. 내가 구현한 기능 리스트
- 로그인 API : 토큰 발급하여 로그인 유저 사이트 이용 구분
- 장바구니 CRUD
- 장바구니에 담긴 상품 옵션 변경페이지
- 구매 API
- 실시간 재고 확인 함수 모듈화 구현<br>

7. 개선 사항 및 필요한 추가 기능 구현 리스트<br>
  - 결제시 orders와 sales db추가하여 매출 및 주문 관리 필요<br>
  - Dao단에서 쿼리를 최대한 적게 이용하여 리팩토링 필요 (ex, checkStock을 쿼리문에서 사용)
  - promotion<br>
  - multer로 리뷰 작성시 이미지 삽입<br>
  - 백엔드 단에서 검색기능<br>
  - 소셜로그인<br>
   
8. 회고<br>
  - 존중과 배려와 즐거움.<br>
  - 결과물에 너무 집착하지 말자.<br>
  - 배운점을 어떻게 활용할지에 집중하자.<br>
  - 내 코드를 어떻게 더 잘 짤지에 대해 집중. (양질의 코드를 만들자)<br>
  - 코드리뷰는 너무 한방에 하지 말고 작은 단위로(PR 잘 활용)<br>
  - 모든 멘토님께 질문하자.<br>

9. Reference<br>
이 프로젝트는 나이키 사이트를 참조하여 학습목적으로 만들었습니다.<br>
실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.<br>
이 프로젝트에서 사용하고 있는 사진 대부분은 위코드에서 직접 촬영한 것이므로 해당 프로젝트 외부인이 사용할 수 없습니다.<br>
