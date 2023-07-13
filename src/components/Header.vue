<template>
  <div className="header" id="header">
      <div>
        <img src="../assets/logo.png" alt="" />
      </div>
      <span>Convidado</span>
</div>
</template>

<script>
export default {
    name: 'HeaderComponent',
}
</script>

<style lang="scss" scoped>
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  top: 20px;
  margin-bottom: 60px;
  width: 100%;
  padding: 0 50px;
  
  span {
    position: relative;
    top: 17px;
    right: 20px;
    color: blue;
  }

  @media screen and (max-width: 1100px) {
    top: 0px;
  }

  @media screen and (max-width: 450px) {
    span {
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    } 
  }

  img {
    width: 190px;
    height: 90px;
    object-fit: contain;
    position: absolute;
    top: -15px;
  }
}
</style>