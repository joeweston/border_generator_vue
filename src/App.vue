<template>
<div id="app">

  <h2>
    Multiple Border Generator - Using Box Shadow
  </h2>
  <div id="button-holder">
    <button @click="addBorder">Add Border</button>
    <button @click="removeBorder" :disabled="subBorders.length===1">Remove Border</button>
  </div>
  <div id="controls-container">
    <BorderControl v-for="(eachBorder, index) in subBorders" :subBorder=eachBorder
    :key=index
    :borderNum=index
    @insetChange="updateInset"
    @blurChange="updateBlur"
    @sizeChange="updateSize"
    @colorChange="updateColor"></BorderControl>
  </div>
  <div :style=vueCss class="example">
    <pre><code>{{css}}</code></pre>
  </div>
</div>

</template>

<script>
import SubBorder from "./SubBorder";


import BorderControl from "./components/BorderControl"


export default {
  components:{
    BorderControl,
  },
  data() {
    return {
      subBorders: [new SubBorder()],
    }
  },
  computed:{
    innerCss(){
      let cssString = ""
      for (let i = 0; i < this.subBorders.length; i++){
        if( i === 0 ){
          cssString += `  ${this.subBorders[i].getCss()}`
        } else{
          cssString +=`\,  \n  ${this.subBorders[i].getCss()}`
        }
      }
      return cssString;
    },
    vueCss(){
      return {boxShadow: `${this.innerCss}`}
    },
    css(){
      return `.target {
  box-shadow ${this.innerCss};
}`
    }

  },
  methods:{
    updateBlur(borderNum, value){
      this.subBorders[borderNum].blur = value
    },
    updateInset(borderNum, value){
      this.subBorders[borderNum].inset = value
    },
    updateSize(borderNum, value){
      this.subBorders[borderNum].size = value
    },
    updateColor(borderNum, value){
      this.subBorders[borderNum].color = value
    },
    addBorder(){
      this.subBorders.push( new SubBorder() );
    },
    removeBorder(){
      if (this.subBorders.length > 1){
        this.subBorders.pop();
      }
    }


  },


}
</script>
<style lang="scss">
@import "assets/reset";


$main-font: Arial, Helvetica, sans-serif;
$code-font: "Courier New", Courier, monospace;

@mixin megaCenter{
  display: flex;
  justify-content: center;
  align-items: center;
}

#app{
  font-family: $main-font;
  @include megaCenter;
  flex-direction: column;
}
h2{
  font-size: 20px;
  text-align: center;
  padding-top: 20px;
}

#controls-container{
  @include megaCenter;
  flex-wrap: wrap;
  margin: 0 -5px;
}
.example{
  min-width: 400px;
  overflow-x: auto;
  min-height: 40px;
  padding: 5px;
  margin-top: 30px;
}
code{
  font-family: $code-font;
}
#button-holder{
  button{
    height: 30px;
    width: 60px;
    margin: 20px 10px 10px 0;
    border: none;
    border-radius: 5px;
    transition: background-color .4s;
    box-shadow:  0 0 8px 0 rgb(60,60,255);
    &:hover:enabled{
      background-color: #f7fbe2;
    }
    &:active{
      box-shadow:  0 0 2px 0 grey,
             inset 1px 1px 2px 0 grey;
    }
    &:focus{
      outline: none;
    }
    &:disabled{
      color: #ddd;
      box-shadow:  0 0 8px 0 rgb(255,60,60),
    }
  }
}
</style>




