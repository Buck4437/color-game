Vue.component('button-custom',{
  template: "#button-custom-template",
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
