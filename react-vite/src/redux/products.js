import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await fetch('/api/products', {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
});


export const addProduct = createAsyncThunk('products/add', async (productData) => {
  const res = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error('Failed to add product');
  return res.json();
});


export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ productId, updatedData }) => {
    const res = await fetch(`/api/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(updatedData),
    });
    if (!res.ok) throw new Error('Failed to update product');
    return res.json();
  }
);


export const deleteProduct = createAsyncThunk('products/delete', async (productId) => {
  const res = await fetch(`/api/products/${productId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to delete product');
  return productId;
});



const productsSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.allProducts.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.allProducts[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.allProducts = state.allProducts.filter(p => p.id !== action.payload);
      });
  },
});



export default productsSlice.reducer;