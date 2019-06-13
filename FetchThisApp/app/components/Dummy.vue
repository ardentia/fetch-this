<template>
  <Page actionBarHidden="true">
    <Label text="Hello" />
  </Page>
</template>

<script lang="ts">
  export default {
    data() {
      return {
        currentComponent: 'EditList',
        componentsArray: ['EditList']
      }
    }
  }
</script>

<style scoped></style>