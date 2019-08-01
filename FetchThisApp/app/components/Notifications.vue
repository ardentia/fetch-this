<template>
  <Page actionBarHidden="true" class="page">
    <StackLayout @swipe="swipe">
      <Button text="I updated the list!"
              @tap="sendNotification"
              :notificationType="notificationType.ListUpdated" />
      <Button text="I'm going shopping!"
              @tap="sendNotification"
              :notificationType="notificationType.GoingShopping" />
      <Button text="Shopping done!"
              @tap="sendNotification"
              :notificationType="notificationType.ShoppingDone" />
    </StackLayout>
  </Page>
</template>

<script lang="ts">;
  import Vue from 'nativescript-vue';
  import store from '../store';
  import { NotificationType } from '../enums/notification-type';
  import { SwipeGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures";

  export default {
    data() {
      return {
        notificationType: NotificationType
      }
    },

    methods: {
      sendNotification(args) {
        const notificationType = args.object.notificationType;

        if (args.object.notificationType === NotificationType.ShoppingDone) {
          store.commit('markCurrentListAsCompleted');
        }
        
        // TODO: http request here
      },
      swipe(args: SwipeGestureEventData) {
        if (args.direction === SwipeDirection.right) {
          this.$navigateBack();
        }
      }
    }
  }
</script>

<style scoped>
</style>
