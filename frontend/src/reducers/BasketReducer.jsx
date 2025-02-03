import * as React from "react";
import { useReducer } from "react";

const NamesTypeAction = {
  ADD_NEW_PRODUCT_TO_BASKET: "./ADD_NEW_PRODUCT_TO_BASKET",
  INCREASE_QUANTITY_PRODUCT: "./INCREASE_QUANTITY_PRODUCT",
  DECREASE_QUANTITY_PRODUCT: "./DECREASE_QUANTITY_PRODUCT",
  DELETE_PRODUCT: "./DELETE_PRODUCT",
  RESULT_SUM: "./RESULT_SUM",
  QUANTITY_ALL: "./QUANTITY_ALL",
  RESET_BASKET: "./RESET_BASKET",
  ADD_PAYMENT_TYPE: "./ADD_PAYMENT_TYPE",
  ADD_GUARANTEE_TYPE: "./ADD_GUARANTEE_TYPE",
};

const initialState = {
  paymentType: "",
  quantityAll: null,
  resultSumOld: 0,
  resultSumRelevant: 0,
  basket: [],
};
export const BasketReducerContext = React.createContext(null);

const basketReducer = (state, action) => {
  switch (action.type) {
    case NamesTypeAction.ADD_NEW_PRODUCT_TO_BASKET: {
      const sumRelevant =
        Number(action.product.relevantPrice) +
        Number(action.product.guaranteePrice);
      const sumOld =
        Number(action.product.oldPrice) + Number(action.product.guaranteePrice);

      const newElement = {
        title: action.product.title,
        id: action.product.id,
        relevantPrice: action.product.relevantPrice,
        oldPrice: action.product.oldPrice,
        image: action.product.image,
        quantity: 1,
        sumRelevant: sumRelevant,
        sumOld: sumOld,
        category: action.product.category,
        guarantee: action.product.guarantee,
        guaranteePrice: action.product.guaranteePrice,
      };
      return { ...state, basket: [...state.basket, newElement] };
    }

    case NamesTypeAction.INCREASE_QUANTITY_PRODUCT:
      return {
        ...state,
        basket: [
          ...state.basket.map((el) => {
            return el.id === action.id
              ? {
                  ...el,
                  sumRelevant:
                    el.relevantPrice * (el.quantity + 1) +
                    el.guaranteePrice * (el.quantity + 1),
                  sumOld:
                    el.oldPrice * (el.quantity + 1) +
                    el.guaranteePrice * (el.quantity + 1),
                  quantity: el.quantity + 1,
                }
              : el;
          }),
        ],
      };
    case NamesTypeAction.DECREASE_QUANTITY_PRODUCT:
      return {
        ...state,
        basket: [
          ...state.basket.map((el) => {
            return el.id === action.id && el.quantity >= 1
              ? {
                  ...el,
                  sumRelevant: el.relevantPrice * (el.quantity - 1),
                  sumOld: el.oldPrice * (el.quantity - 1),
                  quantity: el.quantity - 1,
                }
              : el;
          }),
        ],
      };
    case NamesTypeAction.DELETE_PRODUCT:
      return {
        ...state,
        basket: [...state.basket.filter((el) => el.id !== action.id)],
      };

    case NamesTypeAction.RESULT_SUM:
      return {
        ...state,

        resultSumRelevant: state.basket.reduce((acc, curr) => {
          return (
            acc +
            curr.quantity * curr.relevantPrice +
            curr.quantity * curr.guaranteePrice
          );
        }, 0),

        resultSumOld: state.basket.reduce((acc, curr) => {
          return curr.oldPrice
            ? acc +
                curr.quantity * curr.oldPrice +
                curr.quantity * curr.guaranteePrice
            : acc +
                curr.quantity * curr.relevantPrice +
                curr.quantity * curr.guaranteePrice;
        }, 0),
      };
    case NamesTypeAction.QUANTITY_ALL:
      return {
        ...state,
        quantityAll: state.basket.reduce((acc, curr) => {
          return acc + curr.quantity;
        }, 0),
      };
    case NamesTypeAction.RESET_BASKET:
      return {
        ...state,
        quantityAll: null,
        resultSum: 0,
        basket: [],
      };
    case NamesTypeAction.ADD_PAYMENT_TYPE:
      return {
        ...state,
        paymentType: action.payType,
      };

    default:
      return state;
  }
};

export const BasketReducer = ({ children }) => {
  const [basketState, dispatch] = useReducer(basketReducer, initialState);

  const addNewProductToBasket = (product) => {
    dispatch({ type: NamesTypeAction.ADD_NEW_PRODUCT_TO_BASKET, product });
    getResultSum();
    getQuantityAll();
  };
  const decreaseQuantityProduct = (id) => {
    dispatch({ type: NamesTypeAction.DECREASE_QUANTITY_PRODUCT, id });
    getResultSum();
    getQuantityAll();
  };
  const increaseQuantityProduct = (id) => {
    dispatch({ type: NamesTypeAction.INCREASE_QUANTITY_PRODUCT, id });
    getResultSum();
    getQuantityAll();
  };
  const deleteProduct = (id) => {
    dispatch({ type: NamesTypeAction.DELETE_PRODUCT, id });
    getResultSum();
    getQuantityAll();
  };
  const getResultSum = () => {
    dispatch({ type: NamesTypeAction.RESULT_SUM });
  };

  const getQuantityAll = () => {
    dispatch({ type: NamesTypeAction.QUANTITY_ALL });
  };
  const setResetBasket = () => {
    dispatch({ type: NamesTypeAction.RESET_BASKET });
    getResultSum();
    getQuantityAll();
  };
  const addPaymentType = (payType) => {
    dispatch({ type: NamesTypeAction.ADD_PAYMENT_TYPE, payType });
  };

  const addProductToBasket = (product, state = basketState) => {
    if (!state.basket.some((el) => el.id === product.id)) {
      addNewProductToBasket(product);
    } else {
      increaseQuantityProduct(product.id);
    }
  };

  return (
    <BasketReducerContext.Provider
      value={{
        basketState,
        addProductToBasket,
        decreaseQuantityProduct,
        increaseQuantityProduct,
        deleteProduct,
        setResetBasket,
        addPaymentType,
      }}
    >
      {children}
    </BasketReducerContext.Provider>
  );
};
