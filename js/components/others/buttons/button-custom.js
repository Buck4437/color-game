Vue.component('button-custom',{
  template: '<button @click="onclick()" v-if="name.seen" :style="name.style" :disabled="name.disabled">{{name.text}}</button>',
  props:{
    name:{
      text: String,
      seen: Boolean,
      onclick: Function,
      style: Object,
      disabled: Boolean
    }
  },
  methods:{
    onclick: function(){
      this.name.onclick()
    }
  }
})
