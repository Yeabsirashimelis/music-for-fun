import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  musicTitle: "",
  description: "",
  artist: "",
  image: "",
  album: "",
  genre: "",
  duration: "",
  color1: "",
  color2: "",
  headerColor: "",
  vibe: "",
};

const addMusicSlice = createSlice({
  name: "addMusic",
  initialState: initialState,
  reducers: {
    updateField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    updateImage: (state, action) => {
      state.image = action.payload;
    },
    resetForm: (state) => initialState,
  },
});

export const { updateField, updateImage, resetForm } = addMusicSlice.actions;
export default addMusicSlice.reducer;
