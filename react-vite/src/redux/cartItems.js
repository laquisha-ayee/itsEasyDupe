const GET_CART_ITEMS = 'cart/GET_CART_ITEMS';
const ADD_CART_ITEM = 'cart/ADD_CART_ITEM';
const UPDATE_CART_ITEM = 'cart/UPDATE_CART_ITEM';
const DELETE_CART_ITEM = 'cart/DELETE_CART_ITEM';




const getCartItems = (items) => ({
  type: GET_CART_ITEMS,
  items
});

const addCartItem = (item) => ({
  type: ADD_CART_ITEM,
  item
});

const updateCartItem = (item) => ({
  type: UPDATE_CART_ITEM,
  item
});

const deleteCartItem = (id) => ({
  type: DELETE_CART_ITEM,
  id
});




export const fetchCartItems = () => async (dispatch) => {
  const response = await fetch('/api/cart_items/', {
    credentials: 'include'
  });
  
  if (response.ok) {
    const items = await response.json();
    dispatch(getCartItems(items));
    return items;
  }
};

export const createCartItem = (productId, quantity = 1) => async (dispatch, getState) => {
  const state = getState();
  const user = state.session.user;
  const existingCartItems = Object.values(state.cart);
  
  const existingItem = existingCartItems.find(item => item.product_id === productId);
  

  if (existingItem) {
    dispatch(updateCartItemThunk(existingItem.id, existingItem.quantity + quantity));
  } else {
    const response = await fetch('/api/cart_items/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        product_id: productId,
        quantity: quantity,
        user_id: user.id
      })
    });

    if (response.ok) {
      const item = await response.json();
      dispatch(addCartItem(item));
      return item;
    } else {
      const error = await response.json();
      throw error;
    }
  }
};

export const updateCartItemThunk = (id, quantity) => async (dispatch) => {
  const response = await fetch(`/api/cart_items/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ quantity })
  });

  if (response.ok) {
    const item = await response.json();
    dispatch(updateCartItem(item));
    return item;
  } else {
    const error = await response.json();
    throw error;
  }
};

export const deleteCartItemThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/cart_items/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });

  if (response.ok) {
    dispatch(deleteCartItem(id));
    return { message: 'Cart item deleted' };
  } else {
    const error = await response.json();
    throw error;
  }
};




const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CART_ITEMS: {
      const newState = {};
      action.items.forEach(item => {
        newState[item.id] = item;
      });
      return newState;
    }
    case ADD_CART_ITEM: {
      return {
        ...state,
        [action.item.id]: action.item
      };
    }
    case UPDATE_CART_ITEM: {
      return {
        ...state,
        [action.item.id]: action.item
      };
    }
    case DELETE_CART_ITEM: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    default:
      return state;
  }
};

export default cartReducer;