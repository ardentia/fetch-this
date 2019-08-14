<template>
  <Page actionBarHidden="true" class="page">
    <StackLayout @swipe="swipe">
      <Image src="~/assets/images/mirage-message-sent.png"
             horizontalAlignment="center"
             stretch="none"
             class="pb-2"/>
      <Button text="I updated the list!"
              @tap="sendNotification"
              class="btn btn-primary btn-rounded-sm"
              :notificationType="notificationType.ListUpdated" />
      <Button text="I'm going shopping!"
              @tap="sendNotification"
              class="btn btn-primary btn-rounded-sm"
              :notificationType="notificationType.GoingShopping" />
      <Button text="Shopping done!"
              @tap="sendNotification"
              class="btn btn-primary btn-rounded-sm"
              :notificationType="notificationType.ShoppingDone" />
    </StackLayout>
  </Page>
</template>

<script lang="ts">;
  import Vue from 'nativescript-vue';
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
          this.$store.commit('currentShoppingItems/markCurrentListAsCompleted');
        }
        
        // TODO: http request here
      },
      swipe(args: SwipeGestureEventData) {
        if (args.direction === SwipeDirection.right) {
          this.$navigateBack();
          this.$store.commit('appSession/setPreviousViewTitle');
        }
      }
    }
  }
</script>

<style scoped>
</style>
