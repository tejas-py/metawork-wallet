import { combineReducers, configureStore } from '@reduxjs/toolkit'
import notifAndLoadingReducer from './slices/LoadinAndNotifSlice'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createTransform } from 'redux-persist'
import JSOG from 'jsog'

export const JSOGTransform = createTransform(
  (inboundState, key) => JSOG.encode(inboundState),
  (outboundState, key) => JSOG.decode(outboundState)
)

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  // transforms: [JSOGTransform],
  blacklist: ['socketReducer', 'chatReducer'],
}
const rootReducer = combineReducers({
  notifAndLoadingReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)
