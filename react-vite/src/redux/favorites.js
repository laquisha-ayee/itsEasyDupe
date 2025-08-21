const GET_FAVORITES = 'favorites/GET_FAVORITES';
const ADD_FAVORITE = 'favorites/ADD_FAVORITE';
const DELETE_FAVORITE = 'favorites/DELETE_FAVORITE';



const getFavorites = (favorites) => ({
  type: GET_FAVORITES,
  favorites
});

const addFavorite = (favorite) => ({
  type: ADD_FAVORITE,
  favorite
});

const deleteFavorite = (id) => ({
  type: DELETE_FAVORITE,
  id
});





export const fetchFavorites = () => async (dispatch) => {
  const response = await fetch('/api/favorites/', {
    credentials: 'include'
  });
  
  if (response.ok) {
    const favorites = await response.json();
    dispatch(getFavorites(favorites));
    return favorites;
  }
};

export const createFavorite = (productId) => async (dispatch, getState) => {
  const state = getState();
  const user = state.session.user;
  const existingFavorites = Object.values(state.favorites);
  

  

  const existingFavorite = existingFavorites.find(fav => fav.product_id === productId);
  
  if (!existingFavorite) {
    const response = await fetch('/api/favorites/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        product_id: productId,
        user_id: user.id
      })
    });

    if (response.ok) {
      const favorite = await response.json();
      dispatch(addFavorite(favorite));
      return favorite;
    } else {
      const error = await response.json();
      throw error;
    }
  }
};

export const deleteFavoriteThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/favorites/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  });

  if (response.ok) {
    dispatch(deleteFavorite(id));
    return { message: 'Favorite deleted' };
  } else {
    const error = await response.json();
    throw error;
  }
};




const favoritesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FAVORITES: {
      const newState = {};
      action.favorites.forEach(favorite => {
        newState[favorite.id] = favorite;
      });
      return newState;
    }
    case ADD_FAVORITE: {
      return {
        ...state,
        [action.favorite.id]: action.favorite
      };
    }
    case DELETE_FAVORITE: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    default:
      return state;
  }
};

export default favoritesReducer;




