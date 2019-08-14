<template>
  <Page actionBarHidden="true">
    <StackLayout class="form">
      <Image src="~/assets/images/mirage-list-is-empty.png"
             horizontalAlignment="center"
             stretch="none"
             class="pb-2"/>

      <StackLayout class="input-field">
        <TextField v-model="listName" class="input" hint="Option 2" />
        <StackLayout class="hr-light"></StackLayout>
      </StackLayout>

      <Button :text="buttonLabel" class="btn btn-primary" @tap="addList" />
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