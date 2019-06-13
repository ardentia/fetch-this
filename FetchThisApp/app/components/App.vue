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
        <Label class="drawer-header" text="Need More Actions?"/>

        <Label class="drawer-item" text="View Completed Lists"/>
        <Label class="drawer-item" text="Invite people" @tap="navigateToPage" pageName="Dummy" />
      </StackLayout>

      <StackLayout ~mainContent class="home-panel">
        <Frame ref="mainContentFrame" @pageChange="onPageChange" @navigationRequest="onNavigationRequest" />
      </StackLayout> 
    </RadSideDrawer>
  </Page>
</template>

<script lang="ts">;
  import EditList from './EditList.vue';
  import Dummy from './Dummy.vue';

  export default {
    data() {
      return {
        componentsMap: {
          EditList, Dummy
        }
      }
    },

    components: {
      EditList, Dummy
    },

     mounted() {
      this.$navigateTo(EditList, { frame: this.$refs.mainContentFrame });
    },

    methods: {
      navigateToPage(args) {
        this.$navigateTo(this.componentsMap[args.object.pageName], { frame: this.$refs.mainContentFrame });
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
