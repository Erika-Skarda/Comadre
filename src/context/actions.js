import products from '../data/Products';


let arr = products;
let mapArr = arr.map(product => product.key)

let min = mapArr.map(Number).reduce(function(a, b) {
  return Math.min(a, b);
});

let max = mapArr.map(Number).reduce(function(a, b) {
  return Math.max(a, b);
});

let sortedArr = mapArr.sort();

const missing = [];
for (let i=0; i<sortedArr.length - 1; i++) {
  if(((sortedArr[i] + 1) !== sortedArr[i + 1]))  {
    missing.push(sortedArr[i] + 1)
  }
};

const actions = {
  createProduct(state, action) {
    const product = action.payload;
    product.key = (missing.length == 0 ? max + 1 : missing[0]);
    if(product.amount > 0 && product.unit_value > 0 && product.name !== null) {
      alert('Produto cadastrado com sucesso! ✨')
      return {
        ...state,
        products: [...state.products, product],
      }
    } else {
      return {
        ...state,
        products: [...state.products],
      }
    }
  },
  updateProduct(state, action) {
    const updatedProduct = action.payload
    return {
      ...state,
      products: state.products.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    };
  },
  deleteProduct(state, action) {
    const product = action.payload;
      return   {
        ...state,
        products: state.products.filter(p => p.id !== product.id)
    };
  }
}


export function reducer(state, action) {
  const fn = actions[action.type];
    return fn ? fn(state, action) : state;
}
