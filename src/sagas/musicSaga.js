import { call, put, takeLatest } from "redux-saga/effects";
import { resetForm } from "../slices/formSlice";
import supabase, { supabaseUrl } from "../../supabase";
import {
  fetchMusicsFailure,
  fetchMusicsSuccess,
  fetchMusicsStart,
  deleteMusicStart,
  deleteMusicSuccess,
  deleteMusicFailure,
  fetchSelectedMusicStart,
  fetchSelectedMusicSuccess,
  fetchSelectedMusicFailure,
  addOrUpdateMusicsStart,
  addOrUpdateMusicsSuccess,
  addOrUpdateMusicsFailure,
} from "../slices/musicSlice";
import toast from "react-hot-toast";

// Saga to fetch music data
function* fetchMusicsData() {
  try {
    yield put(fetchMusicsStart());

    const { data: musics, error } = yield call(() =>
      supabase.from("musics").select("*")
    );
    if (error) throw new Error(error.message);
    // Dispatch the fetched musics to the Redux store
    yield put(fetchMusicsSuccess(musics));
  } catch (error) {
    yield put(fetchMusicsFailure(error.message));
    console.error("Failed to fetch music data:", error.message);
  }
}

// Saga to handle form submission
function* submitForm(action) {
  try {
    yield put(addOrUpdateMusicsStart());

    const image = action.payload.image;
    const imageName = `${Math.random()}-${image.name}`.replaceAll("/", "");

    // Generate the image path
    const imagePath = `${supabaseUrl}/storage/v1/object/public/houses/${imageName}`;

    // Insert the music data into the database
    const { data, error } = yield call(() =>
      supabase
        .from("musics")
        .insert([{ ...action.payload, image: imagePath }])
        .single()
    );

    if (error) throw new Error(error.message);

    // Upload the image to Supabase storage
    const { error: storageError } = yield call(() =>
      supabase.storage.from("houses").upload(imageName, image)
    );

    if (storageError) {
      yield put(deleteMusicStart());
      yield call(() => supabase.from("musics").delete().eq("id", data.id));
      yield put(deleteMusicFailure(storageError.message));
      throw new Error(storageError.message);
    }

    // Dispatch success actions
    yield put(addOrUpdateMusicsSuccess());
    yield put(resetForm());

    // Display success toast
    toast.success("Music added successfully!");
  } catch (error) {
    yield put(addOrUpdateMusicsFailure(error.message));
    console.error("Failed to submit form:", error.message);

    // Display error toast
    toast.error("Failed to add music. check your internet connection!");
  }
}

function* updateMusic(action) {
  try {
    yield put(addOrUpdateMusicsStart());

    const { data, error } = yield call(() =>
      supabase
        .from("musics")
        .update([action.payload.data])
        .eq("id", action.payload.id)
        .select("*")
    );
    console.log(data);

    if (error) {
      throw new Error(error);
    }

    // Dispatch success actions
    yield put(resetForm());
    yield put(addOrUpdateMusicsSuccess());

    // Display success toast
    toast.success("Music infos updated successfully!");
    return "OK";
  } catch (error) {
    yield put(addOrUpdateMusicsFailure(error.message));
    console.error("Failed to update music:", error.message);

    // Display error toast
    toast.error("Failed to update music: check your internet connection!");
    return "BAD";
  }
}

function* deleteMusic(action) {
  try {
    yield put(deleteMusicStart()); // Start deleting state

    const { error } = yield call(() =>
      supabase.from("musics").delete().eq("id", action.payload)
    );

    if (error) throw new Error(error.message);

    toast.success("music deleted successfully");
    yield put(deleteMusicSuccess(action.payload)); // Successfully deleted
  } catch (error) {
    yield put(deleteMusicFailure(error.message)); // Failure state
    console.error("Failed to delete music:", error.message);
    toast.error("can't delete music, check your internet connection");
  }
}

function* fetchSelectedMusic(action) {
  try {
    yield put(fetchSelectedMusicStart());

    const { data: music, error } = yield call(() =>
      supabase.from("musics").select("*").eq("id", action.payload).single()
    );

    if (error) throw new Error(error.message);

    yield put(fetchSelectedMusicSuccess(music)); // Successfully deleted
  } catch (error) {
    yield put(fetchSelectedMusicFailure(error.message)); // Failure state
    console.error("Failed to delete music:", error.message);
  }
}

function* musicSaga() {
  yield takeLatest("fetchMusicData", fetchMusicsData);
  yield takeLatest("submitForm", submitForm);
  yield takeLatest("updateMusic", updateMusic);
  yield takeLatest("deleteMusic", deleteMusic);
  yield takeLatest("fetchSelectedMusicData", fetchSelectedMusic);
}

export default musicSaga;
