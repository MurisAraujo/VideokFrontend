<template>
  <div class="endPage">
    <Header />
    <div class="pageBody">
      <p>
        Atenção esta chamada foi finalizada entre em contato para obter uma nova
      </p>
      <div class="container-buttons">
        <b-button
          variant="primary"
          pill
        >
          Voltar para ligação</b-button
        ><b-button
          variant="outline-primary"
          pill
        >
          Fechar guia
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
    name: 'FimView',
    components: { Header },
};
</script>

<style lang="scss" scoped>
.endPage {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  
  .pageBody {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button{
        margin: 10px;
        padding: 15px;
    }

    p {
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      font-family: "Google Sans",Roboto,Arial,sans-serif;
      font-size: 2rem;
      letter-spacing: 0;
      line-height: 2.25rem;
      cursor: default;
      overflow: hidden;
      padding: 0 1.5rem;
      position: relative;
      color: blue;
      text-align: center;
      padding: 25px 0px;
      margin-bottom: 40px;

      &::before {
        position: absolute;
        content: '';
        width: 200px;
        height: 10px;
        background-color: rosybrown;
        top: 0px;
        left: 0px;
        z-index: 0;

        @media screen and (max-width: 1100px) {
          right: 20px;
          left: initial;
        }
      }

      &::after {
        position: absolute;
        content: '';
        width: 200px;
        height: 10px;
        background-color: yellow;
        bottom: 0px;
        right: 0px;
        z-index: 0;

        @media screen and (max-width: 1100px) {
          right: 0px;
          left: 20px;
        }
      }

    }

  }

}
</style>
