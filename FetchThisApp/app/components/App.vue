<template>
  <Page>
    <ActionBar>
      <FlexboxLayout justifyContent="space-between" flexDirection="row" width="100%">
        <Label class="fas"
               width="10%"
               :text="'fa-bars' | fonticon"
               @tap="$refs.drawer.nativeView.showDrawer()"/>

        <Label class="title" width="75%" text="Fetch This!" />

        <Label class="fas" width="10%" :text="'fa-shopping-basket' | fonticon"/>
      </FlexboxLayout>
    </ActionBar>

    <RadSideDrawer ref="drawer">
      <StackLayout ~drawerContent class="drawer-wrapper">
        <Label class="drawer-header" text="Need More Actions?"/>

        <Label class="drawer-item" text="View Completed Lists"/>
        <Label class="drawer-item" text="Invite people"/>
      </StackLayout>

      <ScrollView ~mainContent>
        <StackLayout class="home-panel">
          <TextField v-model="textFieldValue" hint="Enter text..." />
          <Button text="Add Item" @tap="onButtonTap" />

          <ListView class="list-group" for="item in items" style="height:1250px">
            <v-template>
              <FlexboxLayout justifyContent="space-between" flexDirection="row" width="100%">
                <CheckBox :checked="item.checked" :text="item.text" class="list-group-item-heading" width="90%"></CheckBox>
                <Label class="fas" width="10%" :text="'fa-trash' | fonticon" :item="item" @tap="removeItemFromList" />
              </FlexboxLayout>
            </v-template>
          </ListView>
        </StackLayout>
      </ScrollView>
    </RadSideDrawer>
  </Page>
</template>

<script lang="ts">
  export default {
    data() {
      return {
        items: [],
        textFieldValue: ''
      }
    },

    methods: {
      onButtonTap() {
        if (this.textFieldValue &&!this.items.includes(this.textFieldValue)) {
          this.items.push({
            text: this.textFieldValue,
            checked: false
          });
          this.textFieldValue = '';
        }
      },
      removeItemFromList(args) {
        const index = this.items.findIndex((item) => {
          return item === args.object.item;
        });

        this.items.splice(index, 1);
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

    .list-group {
      margin: 5 0;
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

    FlexboxLayout .fas {
      position: relative;
      top: 2;
      font-size: 30;
    }
</style>
