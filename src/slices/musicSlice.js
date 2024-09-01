import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  musics: [],
  music: {},
  loading: false,
  error: null,
  deleting: false,
  redirectPath: null,
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    addOrUpdateMusicsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addOrUpdateMusicsSuccess: (state, action) => {
      state.loading = false;
    },
    updateMusicSuccess: (state, action) => {
      state.redirectPath = `/music/${action.payload.id}`;
    },
    resetRedirectPath: (state) => {
      state.redirectPath = null; // Reset redirect path
    },
    addOrUpdateMusicsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchMusicsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMusicsSuccess: (state, action) => {
      state.musics = action.payload;
      state.loading = false;
    },
    fetchMusicsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSelectedMusicStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSelectedMusicSuccess: (state, action) => {
      state.music = action.payload;
      state.loading = false;
    },
    fetchSelectedMusicFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteMusicStart: (state) => {
      state.deleting = true;
      state.error = null;
    },
    deleteMusicSuccess: (state, action) => {
      state.musics = state.musics.filter(
        (music) => music.id !== action.payload
      );
      state.deleting = false;
    },
    deleteMusicFailure: (state, action) => {
      state.deleting = false;
      state.error = action.payload;
    },
  },
});

export const {
  addOrUpdateMusicsStart,
  addOrUpdateMusicsSuccess,
  updateMusicSuccess,
  resetRedirectPath,
  addOrUpdateMusicsFailure,
  fetchMusicsStart,
  fetchMusicsSuccess,
  fetchMusicsFailure,
  fetchSelectedMusicStart,
  fetchSelectedMusicSuccess,
  fetchSelectedMusicFailure,
  deleteMusicStart,
  deleteMusicSuccess,
  deleteMusicFailure,
} = musicSlice.actions;

export default musicSlice.reducer;
