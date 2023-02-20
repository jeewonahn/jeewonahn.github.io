<template>
  <div class="BigDas-notfound-page">
    <b-card class="notfound-card" title="홈페이지 리뉴얼">
      <p class="card-text">
        안녕하세요. 데이터공학 연구실 홈페이지 입니다.
      </p>
      <p class="card-text">
        현재 홈페이지 리뉴얼 중입니다. 이용에 불편을 끼쳐드려서 죄송합니다.
      </p>
      <p class="card-text">
        연구실 관련 업무 사항은 다음 연락처로 연락부탁드립니다.
      </p>
    </b-card>
    <b-card class="notfound-card" title="지도교수님" sub-title="박상현">
      <p class="card-text">Email: Sang-Wook@yonsei.ac.kr</p>
      <p class="card-text">Phone: (02) 2123-5714</p>
      <p class="card-text">Office: 연세대학교 제4공학관 D913</p>
      <p class="card-text">약력: <a href="http://BigDas.yonsei.ac.kr/Sang-Wook">Link</a></p>
    </b-card>
    <b-card class="notfound-card" title="연구실 방장" sub-title="최원기">
      <p class="card-text">Email: cwk1412@yonsei.ac.kr</p>
      <p class="card-text">Phone: (02) 2123-7757</p>
      <p class="card-text">Office: 연세대학교 제4공학관 D714</p>
    </b-card>
    <b-card class="notfound-card notfound-card-end" title="연구실 부방장" sub-title="하지환">
      <p class="card-text">Email: jihwanha@yonsei.ac.kr</p>
      <p class="card-text">Phone: (02) 2123-7757</p>
      <p class="card-text">Office: 연세대학교 제4공학관 D714</p>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
.BigDas-notfound-page {
  display: flex;
  flex-direction: column;
}

.notfound-card {
  margin: 16px 16px 0 16px;
}

.notfound-card.notfound-card-end {
  margin-bottom: 16px;
}
</style>
