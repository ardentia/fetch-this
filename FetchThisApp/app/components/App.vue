<template>
  <Page class="page">
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
      <StackLayout ~drawerContent class="sidedrawer-content drawer-wrapper">
        <StackLayout class="sidedrawer-list-item" v-if="!currentList">
          <Image src="~/assets/images/buttons/create-list.png" 
                 stretch="aspectFit"
                 loadMode="async"
                 class="drawer-item"
                 text="Create New List"
                 @tap="navigateToPage"
                 pageName="CreateShoppingList" />
        </StackLayout>

        <StackLayout class="sidedrawer-list-item" v-if="currentList">
          <Image src="~/assets/images/buttons/edit-list-name.png" 
                 stretch="aspectFit"
                 loadMode="async"
                 class="drawer-item"
                 @tap="navigateToPage"
                 pageName="CreateShoppingList"
                 :routeProps="{isInEditMode: true}" />
        </StackLayout>

        <StackLayout class="sidedrawer-list-item" v-if="currentList">
          <Image src="~/assets/images/buttons/shopping-items.png"
                 stretch="aspectFit"
                 loadMode="async"
                 class="drawer-item"
                 @tap="navigateToPage"
                 pageName="EditShoppingItems" />
        </StackLayout>
      </StackLayout>

      <StackLayout ~mainContent class="home-panel">
        <Frame ref="mainContentFrame" />
      </StackLayout>
    </RadSideDrawer>
  </Page>
</template>

<script lang="ts">
  import Vue from 'nativescript-vue';
  import { Page, NavigatedData } from 'tns-core-modules/ui/page';
  import { getFrameById } from 'tns-core-modules/ui/frame';
  import { ComponentMetadata } from '../interfaces/component-metadata';
  import Welcome from './Welcome.vue';
  import EditShoppingItems from './EditShoppingItems.vue';
  import CreateShoppingList from './CreateShoppingList.vue';
  import Notifications from './Notifications.vue';

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
        }
      }
    },

    computed: {
      currentList() {
        return this.$store.getters['shoppingList/currentShoppingList'];
      },
      currentShoppingListItems() {
        return this.$store.getters['shoppingList/currentShoppingItems']
      },
      pageTitle() {
        return this.$store.state.appSession.viewTitle;
      },
      currentView() {
        return this.$store.getters['appSession/getCurrentView'];
      }
    },

    mounted() {
      Vue.prototype.$mainFrame = this.$refs.mainContentFrame;
      this.$navigateTo(Welcome, { frame: this.$refs.mainContentFrame });
      this.$store.commit('appSession/changeViewTitle', this.componentsMap.Welcome.title);
      this.$store.commit('appSession/setCurrentView', this.componentsMap.Welcome.component);
    },

    methods: {
      navigateToPage(args) {
        const routeProps = args.object.routeProps;
        const componentToDisplay: ComponentMetadata = this.componentsMap[args.object.pageName];

        if (Object.is(componentToDisplay, this.currentView)) {
          return;
        }

        let routeExtras: any = {
          frame: this.$refs.mainContentFrame,
          transition: {
            name: args.object.transition || 'slideRight'
          }
        };

        let viewTitle = componentToDisplay.title;

        if (routeProps) {
          routeExtras = { ...routeExtras, props: { ...routeProps } };

          if (routeProps.isInEditMode) {
           viewTitle = componentToDisplay.editTitle;
          }
        }

        this.$store.commit('appSession/changeViewTitle', viewTitle);
        this.$store.commit('appSession/setCurrentView', componentToDisplay);
        this.$navigateTo(componentToDisplay.component, routeExtras);
        this.$refs.drawer.nativeView.closeDrawer();
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
    background-color: #bbd9e6;
  }

  .drawer-header {
    padding: 20 16 16 16;
    margin-bottom: 16;
    background-color: #d9c4f5;
    color: #ffffff;
    font-size: 24;
  }

  .drawer-item {
    padding-top: 50;
    padding-left: 80;
    color: #333333;
    font-size: 20;
  }

  .nav-icon {
    position: relative;
    top: 2;
    font-size: 30;
  }

  .sidedrawer-list-item {
    width: 220;
    height: 120;
    margin-top: 10;
  }
</style>
