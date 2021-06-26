<template>
    <div class="container" onclick="window.open('http://gerrit.aospk.org','mywindow');">
      <h3>Latest Changes</h3>
     <ul id="example-1">
  <li v-for="item in data" :key="item.id">

    <div class="flex">
      <span class="title">
        {{ item.subject }}
      </span>
      <span class="subtitle">
        {{ item.project }}
      </span>
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

span:hover {
  color: #fff;
}

span {
  font-size: 15px;
}


.subtitle {
  color: #9b9b9b
}
</style>
