import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counter';
import authReducer from '../features/auth/auth';
import businessReducer from '../features/business/business';
import cartReducer from '../features/cart/cart';
import categoriesReducer from '../features/categories/categories';
import productsReducer from '../features/products/products';
import userReducer from '../features/user/user';
import searchReducer from '../features/search/search';

export const store = configureStore ({
    reducer:{
        counter: counterReducer,
        auth : authReducer,
        business : businessReducer,
        cart : cartReducer,
        categories : categoriesReducer,
        products : productsReducer,
        user : userReducer,
        search : searchReducer
    }
})