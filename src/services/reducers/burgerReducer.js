import { ADD, REMOVE, UPDATE_INGREDIENTS } from "../actions/burger";

const initialState = {
  ingredients: [],
  totalPrice: null,
  ingredientCounts: {},
};

export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD: {
      const isBun = action.item.type === 'bun';
      const prevBun = state.ingredients.find(ingredient => ingredient.type === 'bun');
      const ingredientId = action.item._id;
      const currentCount = state.ingredientCounts[ingredientId] || 0;
      
      if (isBun && currentCount >= 1) {
        return state;
      }

      return {
        ...state,
        ingredients: isBun
          ? [...state.ingredients.filter(ingredient => ingredient.type !== 'bun'), action.item]
          : [...state.ingredients, action.item],
        totalPrice: isBun
          ? prevBun ? state.totalPrice + action.item.price - prevBun.price : state.totalPrice + action.item.price
          : state.totalPrice + action.item.price,
        ingredientCounts: isBun
          ? {
            ...state.ingredientCounts,
            [prevBun?._id]: 0,
            [ingredientId]: currentCount + 1,
          }
          : {
            ...state.ingredientCounts,
            [ingredientId]: currentCount + 1,
          },
      };
    }
    case REMOVE: {
      const ingredientId = action.item._id;
      const currentCount = state.ingredientCounts[ingredientId] || 0;
      const newIngredientCounts = {
        ...state.ingredientCounts,
        [ingredientId]: Math.max(0, currentCount - 1),
      };

      return {
        ...state,
        ingredients: state.ingredients.filter(ingredient => ingredient.uuid !== action.item.uuid),
        totalPrice: state.totalPrice - action.item.price,
        ingredientCounts: newIngredientCounts,
      };
    }
    case UPDATE_INGREDIENTS: {
      const currentBuns = state.ingredients.filter(ingredient => ingredient.type === 'bun');
      return {
        ...state,
        ingredients: [...currentBuns, ...action.item],
      };
    }
    default: {
      return state;
    }
  }
};