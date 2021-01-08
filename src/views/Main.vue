<template>
  <a-card>
    <multiple-choice-box :replace-fields="{ children: 'child',title: 'name'}"></multiple-choice-box>
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

}
</script>

<style scoped>

</style>
