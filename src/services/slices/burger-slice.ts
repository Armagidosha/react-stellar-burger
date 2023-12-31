import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { Ingredients } from "../../types/types";

type InitialState = {
  ingredients: Ingredients[]
  totalPrice: number
  ingredientCounts: {
    [key: string]: number
  }
}

const initialState: InitialState = {
  ingredients: [],
  totalPrice: 0,
  ingredientCounts: {}
};

export const burgerSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<Ingredients>) => {
      const isBun = action.payload.type === 'bun';
      const prevBun = state.ingredients.find(ingredient => ingredient.type === 'bun');
      const ingredientId = action.payload._id;
      const currentCount = state.ingredientCounts[ingredientId] || 0;
      if (isBun && currentCount >= 1) {
        return;
      };

      state.ingredients = isBun ? [...state.ingredients.filter(ingredient => ingredient.type !== 'bun'), action.payload] :
        [...state.ingredients, action.payload];

      state.totalPrice = isBun ? prevBun ? state.totalPrice + action.payload.price - prevBun.price :
        state.totalPrice + action.payload.price : state.totalPrice + action.payload.price;

      state.ingredientCounts = isBun && prevBun ? {
        ...state.ingredientCounts,
        [prevBun?._id]: 0,
        [ingredientId]: currentCount + 1,
      } : isBun ? {
        ...state.ingredientCounts,
        [ingredientId]: currentCount + 1
      } : {
        ...state.ingredientCounts,
        [ingredientId]: currentCount + 1,
      };
    },
    removeIngredient: (state, action: PayloadAction<Ingredients>) => {
      const ingredientId = action.payload._id;
      const currentCount = state.ingredientCounts[ingredientId] || 0;
      const newIngredientCounts = {
        ...state.ingredientCounts,
        [ingredientId]: Math.max(0, currentCount - 1),
      };
      state.ingredients = state.ingredients.filter(ingredient => ingredient.uuid !== action.payload.uuid);
      state.totalPrice = state.totalPrice - action.payload.price;
      state.ingredientCounts = newIngredientCounts;
    },
    updateIngredients: (state, action: PayloadAction<Ingredients[]>) => {
      const currentBuns = state.ingredients.filter(ingredient => ingredient.type === 'bun');
      state.ingredients = [...currentBuns, ...action.payload]
    },
    clearStash: () => initialState,
  }
})

export const { addIngredient, removeIngredient, updateIngredients, clearStash } = burgerSlice.actions;
export default burgerSlice.reducer