<template>
  <div>
    <ChangesView/>
  </div>
</template>

<script>
import ChangesView from "../components/changelog/ChangesView.vue";

export default {
  name: 'Changes',
  components: {
    ChangesView,
  },
  created() {
    // this.$store.dispatch('fetchBuilds', this.$route.params);
  },
  mounted() {
    // console.log(this.$store.state.device);
  },
};
</script>
