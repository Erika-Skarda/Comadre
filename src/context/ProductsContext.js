import React, { createContext, useReducer } from 'react';
import { reducer } from './actions';
import products from '../data/Products';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const ProductsContext = createContext({});

export const ProductsProvider = props => {
  const initialState = { products }
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ProductsContext.Provider>
  )
}

export default ProductsContext