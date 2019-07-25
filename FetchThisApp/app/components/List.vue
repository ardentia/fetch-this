<template>
  <ScrollView marginTop="3">
    <ListView class="list-group" for="item in $props.items" style="height:1250px">
      <v-template>
        <GridLayout class="list-group-item" rows="*, *" columns="9*, *">
          <CheckBox :checked="item.checked"
                    :text="item.text"
                    row="0" col="0">
          </CheckBox>

          <Label class="fas list-action"
                  :text="'fa-trash' | fonticon"
                  :item="item"
                  row="0" col="1"
                  @tap="removeItemFromList" />
        </GridLayout>
      </v-template>
    </ListView>
  </ScrollView>
</template>

<script lang="ts">
  export default {
    props: {
      items: {
        type: Array,
        default: []
      }
    },

    data() {
      return {
        listItems: this.$props.items
      }
    },

    methods: {
      removeItemFromList(args) {
        const itemIndex = this.$props.items.indexOf(args.object.item);
        this.$emit('item-remove', itemIndex);
        // const index = this.items.findIndex((item) => {
        //   return item === args.object.item;
        // });

        // this.items.splice(index, 1);
      }
    }
  }
</script>