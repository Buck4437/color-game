Vue.component('button-light-upgrades-one-time',{
  template: '<button @click="onclick()" v-if="seen" :style="name.style" v-html="name.text"></button>',
  props:{
    name:{
      text: String,
      cost: Number,
      isHidden: Boolean,
      onclick: Function,
      style: Object
    }
  },
  methods:{
    onclick: function(){
      if(!this.name.disabled){
        this.name.onclick()
      }
    }
  },
  computed:{
    seen: function(){
      return !this.name.isHidden
    }
  }
})
