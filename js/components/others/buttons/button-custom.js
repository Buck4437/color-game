Vue.component('button-custom',{
  template: '<button @click="onclick()" v-if="seen" :style="name.style" :disabled="name.disabled" v-html="name.text"></button>',
  props:{
    name:{
      text: String,
      isHidden: Boolean,
      onclick: Function,
      style: Object,
      disabled: Boolean
    }
  },
  methods:{
    onclick: function(){
      this.name.onclick()
    }
  },
  computed:{
    seen: function(){
      return !this.name.isHidden
    }
  }
})
