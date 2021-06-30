<template>
    <div class="container" >
      <h3>Latest Changes</h3>
     <ul id="example-1">
  <li v-for="item in data" :key="item.id">

    <div class="flex">
      <a class="title" :href="`https://gerrit.aospk.org/c/${item.project}/+/${item._number}`" target="_blank">
        {{ item.subject }}
      </a>
      <a class="subtitle" :href="`https://gerrit.aospk.org/q/project:${item.project}+merged`" target="_blank">
        {{ item.project }}
      </a>
    </div>
  </li>
</ul>
    </div>
</template>
<script>
import VueMarkdown from 'vue-markdown';

import { fetchMergedChanges } from '../../services/gerrit';

export default {
  name: 'ChangesView',
  components: {
    VueMarkdown,
  },
  data() {
    return {
      data: [],
    };
  },
  created() {
    fetchMergedChanges()
      .then(ch => this.data = ch);
  },
};
</script>
<style scoped>
.container {
  padding: 20px;
  background-color: var(--card);
  margin-top: 50px;
  border-radius: 5px;
  padding-top: 10px;
}
</style>
<style>
ul {
  color: white
}

.flex {
  display: flex;
  justify-content: space-between;
}

a:hover {
  color: #fff;
}

a {
  font-size: 15px;
}


.subtitle {
  color: #9b9b9b
}
</style>
