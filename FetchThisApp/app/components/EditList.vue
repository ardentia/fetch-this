<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <TextField v-model="textFieldValue" hint="Enter text..." />
      <Button text="Add Item" @tap="addShoppingItem" />
      <List :items="items" @item-remove="onItemRemove"></List>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
  import { ShoppingListItem } from '../interfaces/shopping-list-item';
  import List from '../components/List.vue';
  import store from '../store';

  export default {
    data() {
      return {
        textFieldValue: ''
      }
    },

    computed: {
      items() {
        return store.getters.currentShoppingItems;
      }
    },

    components: {
      List
    },

    methods: {
      addShoppingItem() {
        const newItem: ShoppingListItem = {
          text: this.textFieldValue,
          checked: false
        };

        store.commit('addShoppingItem', newItem);
        this.textFieldValue = '';
      },
      onItemRemove(index: number) {
        store.commit('removeShoppingItem', index);
      }
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #6C698D;
        color: #ffffff;
    }

    .title {
      text-align: center;
      font-size: 20;
    }

    .home-panel {
      vertical-align: center;
      font-size: 20;
      margin: 15;
      padding-top: 10;
    }

    .list-group-item {
      margin: 10 5 5 5;
      padding: 10;
    }

    .list-group-item .list-action {
      position: relative;
      top: 2;
    }

    .message {
      vertical-align: center;
      text-align: center;
      font-size: 20;
      color: #333333;
    }

    .drawer-wrapper {
      background-color: #D4D2D5;
    }

    .drawer-header {
      padding: 20 16 16 16;
      margin-bottom: 16;
      background-color: #6C698D;
      color: #ffffff;
      font-size: 24;
    }

    .drawer-item {
      padding: 8 16;
      color: #333333;
      font-size: 16;
    }

    .nav-icon {
      position: relative;
      top: 2;
      font-size: 30;
    }
</style>
