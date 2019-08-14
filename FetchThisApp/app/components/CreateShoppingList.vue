<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <Image src="~/assets/images/mirage-list-is-empty.png"
             horizontalAlignment="center"
             stretch="none"
             class="pb-2"/>
      <TextField v-model="listName" hint="List Name" />
      <Button :text="buttonLabel" @tap="addList" />
    </StackLayout>
  </Page>
</template>

<script lang="ts">
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
      this.listName = this.$props.isInEditMode ? this.$store.getters['shoppingList/currentShoppingList'].name : '';
    },

    methods: {
      editList() {
        const currentShoppingList = this.$store.getters['shoppingList/currentShoppingList'];
        currentShoppingList.name = this.listName;
        this.$store.commit('shoppingList/editList', currentShoppingList);
      },
      createList() {
        const shoppingList: ShoppingList = {
          name: this.listName,
          dateCreated: new Date().getTime(),
          isCompleted: false,
          items: this.$store.getters['shoppingList/currentShoppingItems']
        };

        this.$store.commit('shoppingList/addNewShoppingList', shoppingList);
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