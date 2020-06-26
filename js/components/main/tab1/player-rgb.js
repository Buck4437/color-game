Vue.component('player-rgb',{
  template: `
    <div>
      <color-bar :bar="bar" v-if="bar.seen"></color-bar>
      <button-custom :name="auto"></button-custom>
      <button-custom :name="addsub"></button-custom>
    </div>
  `,
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
