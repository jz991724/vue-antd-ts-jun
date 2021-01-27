<template>
  <router-view :key="$route.fullPath"></router-view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'TabsIndex' })
export default class TabsIndex extends Vue {

}
</script>

<style scoped>

</style>
