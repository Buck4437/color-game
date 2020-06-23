Vue.component('button-custom',{
  template: "#button-custom-template",
  props:{
    name:{
      text:{
        type: String,
        required: false,
        default: " "
      },
      seen: {
        type: Boolean,
        required: false,
        default: true
      },
      onclick:{
        type: Function,
        required: false,
        default: function(){
          return
        }
      }
    }
  },
  methods:{
    onclick: function(){
      this.name.onclick()
    }
  }
})
