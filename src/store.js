import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import addMusicReducer from "./slices/formSlice";
import musicReducer from "./slices/musicSlice";
import musicSaga from "./sagas/musicSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    addMusic: addMusicReducer,
    music: musicReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(musicSaga);

export default store;
