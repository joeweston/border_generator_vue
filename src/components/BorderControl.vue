<template>
  <div class="border-control">
    <p class="inset-control">Make Inset?<input type="checkbox" v-model="inset" @change="updateInset"></p>
    <p>Blur ({{blur}}px)</p><p><input type="range" min="0" max="50" v-model="blur" @input="updateBlur"></p>
    <p>Size ({{size}}px)</p><p><input type="range" min="0" max="50" v-model="size" @input="updateSize"></p>
    <div class="color-controls">
      <p>Color: {{this.color}} <button :style="{borderColor: color}"
      @click="toggleColor">{{this.colorHidden?"Pick Color":"Hide Color"}}</button></p>
      <chrome-picker class="chrome-picker" v-if="!colorHidden" :value="color" @input="updateColor"></chrome-picker>
    </div>
  </div>
</template>

<script>
import { Chrome } from 'vue-color';


export default {

  props: [ "subBorder", "borderNum" ],
  data() {
    return {
      inset: this.subBorder.inset,
      blur: this.subBorder.blur,
      size: this.subBorder.size,
      color: this.subBorder.color,
      colorHidden: true
    }
  },
  components:{
    'chrome-picker': Chrome
  },
  methods:{
    updateBlur(){
      this.$emit('blurChange',this.borderNum, this.blur)
    },
    updateInset(){
      this.$emit('insetChange',this.borderNum, this.inset)
    },
    updateSize(){
      this.$emit('sizeChange',this.borderNum, this.size)
    },
    updateColor(value) {
      if(value.rgba.a === 1){
        this.color = `rgb(${value.rgba.r}, ${value.rgba.g}, ${value.rgba.b})`
      } else{
        this.color = `rgba(${value.rgba.r}, ${value.rgba.g}, ${value.rgba.b}, ${value.rgba.a})`
      }
      this.$emit('colorChange',this.borderNum, this.color)
    },
    toggleColor(){
      this.colorHidden = !this.colorHidden;
    }
  }

}


</script>

<style lang="scss" scoped>
@mixin megaCenter{
  display: flex;
  justify-content: center;
  align-items: center;
}
.border-control{
  margin: 5px;
  border: 1px solid black;
  padding: 10px 0;
  width: 260px;
  margin-top: 10px;
  position: relative;
  @include megaCenter;
  flex-direction: column;
  *{
    padding: 2px 0;
  }
  .inset-control{
    padding:8px 0;
    input{
      margin-left: 10px;
      padding: 50%;
      position: relative;
      bottom: 2px;
    }
  }
  [type="range"]{
    width: 230px;
  }
  .color-controls{
    @include megaCenter;
    flex-direction: column;
  }
  .chrome-picker{
    position: absolute;
    bottom: -240px;
    z-index: 99;
  }
}



</style>