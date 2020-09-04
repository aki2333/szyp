<template>
  <div class="Breadcrumb mb-10">
    <div class="bread-list" v-for="(a,b) in bread" :key="b">
      <a>{{a.menu_name}}</a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    breadcrumb: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      bread: []
    };
  },
  watch: {
    $route:{
      handler(val){
        console.log("$route", val, this.$store.state.breadcrumb);
        this.bread = this.$store.state.breadcrumb;
        this.bread = JSON.parse(JSON.stringify(this.bread));
        console.log(this.bread);
      },
      deep:true,
      immediate: true
    },
  },
  mounted() {
    //this.bread = this.$store.state.breadcrumb;
  },
  methods: {}
};
</script>
<style scoped>
.Breadcrumb {
  display: flex;
  font-size: 12px;
  box-sizing: border-box;
  color: #c0cbdc;
}
.bread-list:first-child {
  color: #607fa4;
}
.bread-list:after {
  content: ">";
  margin: 0 5px;
}
.bread-list:last-child::after {
  content: "";
}
</style>