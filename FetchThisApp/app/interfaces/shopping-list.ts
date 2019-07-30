import { ShoppingListItem } from './shopping-list-item';

export interface ShoppingList {
  name: string;
  dateCreated: number;
  items: ShoppingListItem[];
  isCompleted: boolean;
}