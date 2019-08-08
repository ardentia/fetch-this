<template>
  <Page class="page" @navigatingTo="onNavigate">
    <ActionBar>
      <FlexboxLayout justifyContent="space-between" flexDirection="row" width="100%">
        <Label class="fas nav-icon"
               width="10%"
               :text="'fa-bars' | fonticon"
               @tap="$refs.drawer.nativeView.showDrawer()" />

        <Label class="title" width="75%" :text="pageTitle" />

        <Label class="fas nav-icon"
               width="10%"
               @tap="navigateToPage"
               pageName="Notifications"
               transition="slideLeft"
               :text="'fa-shopping-basket' | fonticon" />
      </FlexboxLayout>
    </ActionBar>

    <RadSideDrawer ref="drawer">
      <StackLayout ~drawerContent class="drawer-wrapper">
      <Label v-if="!currentList"
              class="drawer-item"
              text="Create New List"
              @tap="navigateToPage"
              pageName="CreateShoppingList" />
        <Label v-if="currentList"
               class="drawer-item"
               text="Edit List Name"
               @tap="navigateToPage"
               pageName="CreateShoppingList"
               :routeProps="{isInEditMode: true}" />
        <Label v-if="currentList"
               class="drawer-item"
               text="Manage Shopping Items"
               @tap="navigateToPage"
               pageName="EditShoppingItems" />
      </StackLayout>

      <StackLayout ~mainContent class="home-panel">
        <Frame ref="mainContentFrame" />
      </StackLayout>
    </RadSideDrawer>
  </Page>
</template>

<script lang="ts">
  import Vue from 'nativescript-vue';
  import { Page, NavigatedData } from "tns-core-modules/ui/page";
  import { getFrameById } from "tns-core-modules/ui/frame";
  import Welcome from './Welcome.vue';
  import EditShoppingItems from './EditShoppingItems.vue';
  import CreateShoppingList from './CreateShoppingList.vue';
  import Notifications from './Notifications.vue';
  import store from '../store';

  export default {
    data() {
      return {
        componentsMap: {
          EditShoppingItems: {
            title: 'Shopping List Items',
            component: EditShoppingItems
          },
          CreateShoppingList: {
            title: 'Create Shopping List',
            editTitle: 'Edit Shopping List',
            component: CreateShoppingList
          },
          Welcome: {
            title: 'Hello!',
            component: Welcome
          },
          Notifications: {
            title: 'Notify',
            component: Notifications
          }
        },
        pageTitle: ''
      }
    },

    computed: {
      currentList() {
        return store..getters.currentShoppingList;
      },
      currentShoppingListItems() {
        return store.getters.currentShoppingItems;
      }
    },

    mounted() {
      Vue.prototype.$mainFrame = this.$refs.mainContentFrame;
      this.$navigateTo(Welcome, { frame: this.$refs.mainContentFrame });
      this.pageTitle = this.componentsMap.Welcome.title;
    },

    methods: {
      navigateToPage(args) {
        const routeProps = args.object.routeProps;
        const componentToDisplay = this.componentsMap[args.object.pageName];
        let routeExtras: any = {
          frame: this.$refs.mainContentFrame,
          transition: {
            name: args.object.transition || 'slideRight'
          }
        };

        this.pageTitle = componentToDisplay.title;

        if (routeProps) {
          routeExtras = { ...routeExtras, props: { ...routeProps } };

          if (routeProps.isInEditMode) {
            this.pageTitle = componentToDisplay.editTitle;
          }
        }

        this.$navigateTo(componentToDisplay.component, routeExtras);
        this.$refs.drawer.nativeView.closeDrawer();
      },
      onNavigate(args: NavigatedData) {
        const rootFrame = this.$refs.mainContentFrame;
         const page = <Page>rootFrame.currentPage;
         console.log(page);
        //this.pageTitle = this.componentsMap[args.object].title;
      }
    }
  }
</script>

<style scoped>
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
