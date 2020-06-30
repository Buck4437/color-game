Vue.component('button-custom',{
  template: '<button @click="onclick()" v-if="seen" :style="name.style" :disabled="name.disabled" v-html="displayedText"></button>',
  props:{
    name:{
      text: [Object, String, Number],
      currentText: String,
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
    },
    displayedText: function(){
      return typeof this.name.text === "object" ? this.name.text[this.name.currentText]||"Text not found in text properties" : this.name.text||"Text is missing"
    }
  }
})
