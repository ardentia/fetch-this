<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <TextField v-model="listName" hint="List Name" />
      <Button :text="buttonLabel" @tap="addList" />
    </StackLayout>
  </Page>
</template>

<script lang="ts">
  import store from '../store';
  import EditShoppingItems from './EditShoppingItems.vue';
  import { ShoppingList } from '../interfaces/shopping-list';

  export default {
    data() {
      return {
        listName: ''
      }
    },

    props: {
      isInEditMode: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      buttonLabel() {
        return this.$props.isInEditMode ? 'Edit List' : 'Add List';
      }
    },

    created() {
      this.listName = this.$props.isInEditMode ? store.getters.currentShoppingList.name : '';
    },

    methods: {
      editList() {
        const currentShoppingList = store.getters.currentShoppingList;
        currentShoppingList.name = this.listName;
        store.commit('editList', currentShoppingList);
      },
      createList() {
        const shoppingList: ShoppingList = {
          name: this.listName,
          dateCreated: new Date().getTime(),
          isCompleted: false,
          items: store.getters.currentShoppingItems
        };

        store.commit('addNewShoppingList', shoppingList);
      },
      addList() {
        if (this.$props.isInEditMode) {
          this.editList();
        } else {
          this.createList();
        }

        this.$navigateTo(EditShoppingItems, { frame: this.$mainFrame });
      }
    }
  }
</script>

<style scoped></style>