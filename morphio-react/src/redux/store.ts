import { createStore, combineReducers, applyMiddleware } from 'redux';
import type { StoreEnhancer } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { patternReducer } from './reducers/patternReducer';
import { patternSaga } from './sagas/patternSaga';
import type { RootState } from './types';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  pattern: patternReducer,
});

const enhancer: StoreEnhancer = applyMiddleware(sagaMiddleware);

export const store = createStore(rootReducer, undefined, enhancer);

sagaMiddleware.run(patternSaga);

export type AppRootState = RootState;
