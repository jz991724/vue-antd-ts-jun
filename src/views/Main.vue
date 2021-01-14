<template>
  <a-card>
    <multiple-choice-box v-model="test"></multiple-choice-box>
    <pre>{{test}}</pre>
  </a-card>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import MultipleChoiceBox from '@/components/select/MultipleChoiceBox.vue';

@Component({
  name: 'Main',
  components: { MultipleChoiceBox },
})
export default class Main extends Vue {
test=['黎明-01', '黎明-02'];
}
</script>

<style scoped>

</style>
