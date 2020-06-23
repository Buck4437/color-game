Vue.component('player-rgb',{
  template: "#player-rgb-template",
  props:{
    bar:{
      type: Object,
      required: true
    },
    addsub:{
      type: Object,
      required: true
    },
    auto:{
      type: Object,
      required: true
    }
  },
  methods:{
    add: function(){
      this.addsub.onclick()
    }
  }
})
