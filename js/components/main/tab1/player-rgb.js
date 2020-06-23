Vue.component('player-rgb',{
  template: "#player-rgb-template",
  props:{
    bar:{
      type: Object,
      required: true
    },
    addsub:{
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
    add: function(){
      this.addsub.onclick()
    }
  }
})
