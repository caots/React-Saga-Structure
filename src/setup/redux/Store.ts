import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { reduxBatch } from '@manaflair/redux-batch';
import {persistStore} from 'redux-persist';
import { rootReducer, rootSaga } from './RootReducer';

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: true,
    serializableCheck: false,
    immutableCheck: false
  }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [reduxBatch],
});

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/**
 * @see https://github.com/rt2zz/redux-persist#persiststorestore-config-callback
 * @see https://github.com/rt2zz/redux-persist#persistor-object
 */
export const persistor = persistStore(store);
export default store;
