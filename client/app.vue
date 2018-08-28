<template>
    <div id="app">
        <div id="cover"></div>
        <headerx></headerx>
        <todo></todo>
        <footerx></footerx>
    </div>
</template>

<script>
import headerx from 'layout/header'
import footerx from 'layout/footer'
import todo from 'view/to-do'

export default {
  data () {
    return {

    }
  },
  components: {
    headerx,
    footerx,
    todo
  }
}
</script>


<style lang='stylus' scoped>
#app{
    position:absolute;
    top 0px
    left 0
    right 0
    bottom 0
}
#cover{
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    background-color #999999
    opacity 0.9
    z-index -1
}
 


</style>
