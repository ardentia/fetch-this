import * as http from 'http';
import { ShoppingListItem } from '../interfaces/shopping-list-item';
import { ShoppingList } from '../interfaces/shopping-list';
import getItemCopy from '@ardentia/deep-copy';

export default {
  namespaced: true,
  state: {
    shoppingItems: Array<ShoppingListItem>(),
    shoppingLists: Array<ShoppingList>()
  },
  getters: {
    currentShoppingItems(state) {
      return getItemCopy(state.shoppingItems);
    },
    shoppingLists(state) {
      return getItemCopy(state.shoppingLists);
    },
    currentShoppingList(state) {
      return state.shoppingLists.find((list: ShoppingList) => {
        return !list.isCompleted;
      });
    }
  },
  mutations: {
    addShoppingItem(state, item: ShoppingListItem) {
      const itemAlreadyExists = state.shoppingItems
        .some((existingItem: ShoppingListItem) => {
          return item.text === existingItem.text;
        });

      if (!item.text || itemAlreadyExists) {
        return;
      }

      state.shoppingItems.push(item);
    },
    removeShoppingItem(state, index: number) {
      state.shoppingItems.splice(index, 1);
    },
    addNewShoppingList(state, shoppingList: ShoppingList) {
      const listAlreadyExists = state.shoppingLists
        .some((existingItem: ShoppingList) => {
          return shoppingList.name === existingItem.name;
        });

      if (!shoppingList.name || listAlreadyExists) {
        return;
      }

      state.shoppingLists.push(shoppingList);
    },
    editList(state, shoppingList: ShoppingList) {
      let listToEdit = state.shoppingLists
        .find((existingShoppingList: ShoppingList) => {
          return existingShoppingList.dateCreated === shoppingList.dateCreated;
        });

      listToEdit = { ...shoppingList };
    },
    markCurrentListAsCompleted(state) {
      const currentList: ShoppingList = state.shoppingLists.find((list: ShoppingList) => {
        return !list.isCompleted;
      });

      if (currentList) {
        currentList.isCompleted = true;
      }
    },
    lockCurrentList(state) {
      const currentList: ShoppingList = state.shoppingLists.find((list: ShoppingList) => {
        return !list.isCompleted;
      });

      currentList.isLocked = true;
    }
  },
  actions: {

  }
};
