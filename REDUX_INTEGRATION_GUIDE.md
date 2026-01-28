# Redux Integration Guide - Async Operations

This guide shows how to integrate the service layer with Redux using createAsyncThunk for proper state management and loading/error handling.

## Overview

Instead of calling services directly in components, use Redux Thunks to:
- Manage loading states
- Handle errors consistently
- Update global state
- Prevent race conditions
- Make state predictable

## Pattern

```javascript
// 1. Create async thunk
const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters, { rejectWithValue }) => {
    try {
      const data = await productService.getProducts(filters);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 2. Add to slice
const productsSlice = createSlice({
  name: 'products',
  initialState: { items: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// 3. Use in component
const { items, loading, error } = useSelector(state => state.products);
const dispatch = useDispatch();

useEffect(() => {
  dispatch(fetchProducts({}));
}, []);
```

## Implementation Steps

### Step 1: Create Auth Thunks

**File:** `src/features/auth/authThunks.js`

```javascript
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authService.login(credentials.email, credentials.password);
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userRole', data.role);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await authService.signup(userData);
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userRole', data.role);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authService.getProfile();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const data = await authService.updateProfile(profileData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (passwords, { rejectWithValue }) => {
    try {
      await authService.changePassword(passwords.oldPassword, passwords.newPassword);
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

### Step 2: Update Auth Slice

**File:** `src/features/auth/authSlice.js`

Add to the existing slice:

```javascript
import { loginUser, signupUser, getProfile, updateProfile, changePassword } from './authThunks';

const authSlice = createSlice({
  // ... existing code ...
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.isAuthenticated = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
```

### Step 3: Create Product Thunks

**File:** `src/features/products/productThunks.js`

```javascript
import { createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../../services/productService';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const data = await productService.getProducts(filters);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getProductById = createAsyncThunk(
  'products/getProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const data = await productService.getProductById(productId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const data = await productService.getCategories();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const submitReview = createAsyncThunk(
  'products/submitReview',
  async ({ productId, reviewData }, { rejectWithValue }) => {
    try {
      const data = await productService.submitReview(productId, reviewData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const data = await productService.getFeaturedProducts();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

### Step 4: Update Product Slice

**File:** `src/features/products/productSlice.js`

```javascript
import { createSlice } from '@reduxjs/toolkit';
import { 
  fetchProducts, 
  getProductById, 
  fetchCategories, 
  submitReview, 
  fetchFeaturedProducts 
} from './productThunks';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    currentProduct: null,
    categories: [],
    featuredProducts: [],
    loading: false,
    error: null,
    totalCount: 0,
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Product By ID
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Submit Review
      .addCase(submitReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentProduct) {
          state.currentProduct.reviews.push(action.payload);
        }
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Featured Products
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProducts = action.payload;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
```

### Step 5: Create Order Thunks

**File:** `src/features/orders/orderThunks.js`

```javascript
import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderService } from '../../services/orderService';

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const data = await orderService.getOrders(filters);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getOrderById = createAsyncThunk(
  'orders/getOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const data = await orderService.getOrderById(orderId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const data = await orderService.createOrder(orderData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  'orders/cancelOrder',
  async ({ orderId, reason }, { rejectWithValue }) => {
    try {
      const data = await orderService.cancelOrder(orderId, reason);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTrackingInfo = createAsyncThunk(
  'orders/getTrackingInfo',
  async (orderId, { rejectWithValue }) => {
    try {
      const data = await orderService.getTrackingInfo(orderId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

### Step 6: Create Payment Thunks

**File:** `src/features/checkout/paymentThunks.js`

```javascript
import { createAsyncThunk } from '@reduxjs/toolkit';
import { paymentService } from '../../services/paymentService';

export const processCardPayment = createAsyncThunk(
  'payment/processCard',
  async (paymentData, { rejectWithValue }) => {
    try {
      const data = await paymentService.processCardPayment(paymentData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const initiateRefund = createAsyncThunk(
  'payment/initiateRefund',
  async ({ orderId, amount, reason }, { rejectWithValue }) => {
    try {
      const data = await paymentService.initiateRefund(orderId, amount, reason);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSavedMethods = createAsyncThunk(
  'payment/getSavedMethods',
  async (_, { rejectWithValue }) => {
    try {
      const data = await paymentService.getSavedPaymentMethods();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

## Using Thunks in Components

### Login Component Example

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authThunks';

function LoginPage() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    
    if (result.meta.requestStatus === 'fulfilled') {
      // Navigate to home
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        placeholder="Email"
      />
      <input 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        type="password" 
        placeholder="Password"
      />
      {error && <div className="text-red-500">{error}</div>}
      <button disabled={loading} type="submit">
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

### Product List Component Example

```javascript
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productThunks';

function ProductList() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ category: 'vegetables', page: 1 }));
  }, [dispatch]);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Order Creation with Error Handling

```javascript
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../features/orders/orderThunks';

function CheckoutPage() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.orders);
  const cartItems = useSelector(state => state.cart.items);
  const [showError, setShowError] = useState(false);

  const handleCheckout = async (orderData) => {
    const result = await dispatch(createOrder(orderData));
    
    if (result.meta.requestStatus === 'fulfilled') {
      // Show success toast
      showToast('Order created successfully!', 'success');
      // Redirect to orders page
      navigate('/orders');
    } else if (result.meta.requestStatus === 'rejected') {
      // Show error toast
      showToast(error, 'error');
      setShowError(true);
    }
  };

  return (
    <div>
      {showError && (
        <div className="bg-red-100 p-4 rounded">
          <p>{error}</p>
          <button onClick={() => setShowError(false)}>Dismiss</button>
        </div>
      )}
      {/* Checkout form */}
      <button 
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Complete Order'}
      </button>
    </div>
  );
}
```

## Benefits of This Approach

✅ **Centralized State:** All data in Redux store
✅ **Automatic Loading States:** No need to manually set isLoading
✅ **Consistent Error Handling:** All errors follow same pattern
✅ **Easier Testing:** Mock dispatch instead of services
✅ **Better DevTools:** Redux DevTools shows all actions
✅ **Race Condition Prevention:** Redux handles async ordering
✅ **Caching Ready:** Can implement with Redux reselect

## Next Steps

1. Create thunk files for remaining services
2. Update all slices with extraReducers
3. Export thunks from each feature
4. Update components to use dispatch(thunks) instead of direct service calls
5. Add loading/error UI to all components
6. Test with Redux DevTools

## Resources

- [Redux Thunk Documentation](https://redux.js.org/usage/writing-logic-thunks)
- [Redux Toolkit createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk)
- [Redux DevTools Browser Extension](https://github.com/reduxjs/redux-devtools-extension)
