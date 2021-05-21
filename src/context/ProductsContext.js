import React, { createContext, useReducer } from 'react';
import products from '../data/Products';

const initialState = { products };
const ProductsContext = createContext({});

const actions = {
  createProduct(state, action) {
    const product = action.payload;
    product.id = Math.random();
    return {
      ...state,
      products: [...state.products, product],
    }
  },
  updateProduct(state, action) {
    const updatedProduct = action.payload
    return {
      ...state,
      products: state.products.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    }
  },
  deleteProduct(state, action) {
    const product = action.payload;
      return   {
        ...state,
        products: state.products.filter(p => p.id !== product.id)
    }
  }
}

export const ProductsProvider = props => {

  function reducer(state, action) {
    const fn = actions[action.type];
      return fn ? fn(state, action) : state;
    }
  

  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ProductsContext.Provider>
  )
}

export default ProductsContext