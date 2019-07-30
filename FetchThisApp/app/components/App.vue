<template>
  <Page class="page">
    <ActionBar>
      <FlexboxLayout justifyContent="space-between" flexDirection="row" width="100%">
        <Label class="fas nav-icon"
              width="10%"
              :text="'fa-bars' | fonticon"
              @tap="$refs.drawer.nativeView.showDrawer()"/>

        <Label class="title" width="75%" text="Fetch This!" />
        <Label class="fas nav-icon" width="10%" :text="'fa-shopping-basket' | fonticon"/>
      </FlexboxLayout>
    </ActionBar>

    <RadSideDrawer ref="drawer">
      <StackLayout ~drawerContent class="drawer-wrapper">
        <Label v-if="currentList"
               class="drawer-item"
               text="Edit List Name"
               @tap="navigateToPage"
               pageName="CreateShoppingList"
               :routeProps="{isInEditMode: true}"/>
        <Label v-if="currentList"
               class="drawer-item"
               text="Add Shopping Items"
               @tap="navigateToPage"
               pageName="EditList"/>
        <Label v-if="!currentList"
               class="drawer-item"
               text="Create New List"
               @tap="navigateToPage"
               pageName="CreateShoppingList"/>
      </StackLayout>

      <StackLayout ~mainContent class="home-panel">
        <Frame ref="mainContentFrame"/>
      </StackLayout>
    </RadSideDrawer>
  </Page>
</template>

<script lang="ts">;
  import Welcome from './Welcome.vue';
  import EditList from './EditList.vue';
  import CreateShoppingList from './CreateShoppingList.vue';
  import store from '../store';
  import Vue from 'nativescript-vue';

  export default {
    data() {
      return {
        componentsMap: {
          EditList, CreateShoppingList, Welcome
        }
      }
    },

    computed: {
      currentList() {
        return store.getters.currentShoppingList;
      }
    },

    mounted() {
      Vue.prototype.$mainFrame = this.$refs.mainContentFrame;
      this.$navigateTo(Welcome, { frame: this.$refs.mainContentFrame });
    },

    methods: {
      navigateToPage(args) {
        let routeExtras: any = { frame: this.$refs.mainContentFrame };
        if (args.object.routeProps) {
          routeExtras = {...routeExtras, props: { ...args.object.routeProps } };
        }

        this.$navigateTo(this.componentsMap[args.object.pageName], routeExtras);
        this.$refs.drawer.nativeView.closeDrawer();
      }
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #6C698D;
        color: #ffffff;
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
