import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface IFormState {
  counter: number;
  form?: Definitions.IField[] & { [key: string]: any };
  loading: boolean;
  isSavingForm: boolean;
  list?: Definitions.ICrudObj;
}
const initialState: IFormState = {
  counter: 0,
  loading: false,
  isSavingForm: false,
};

export const fetchForm = createAsyncThunk("todo/fetchForm", async (_) => {
  const response = await axios.request({
    url: "form",
    method: "GET",
  });
  return response.data;
});

export const saveUpdatedForm = createAsyncThunk(
  "todo/updateFormValue",
  async (obj: Definitions.ICrudObj) => {
    const response = await axios.request({
      url: "form",
      method: "POST",
      data: obj,
    });
    return response.data;
  }
);

const formSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateForm(state, action) {
      state.form = action.payload;
    },
    resetList(state) {
      state.list = undefined;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchForm.fulfilled, (state, action) => {
        // Add user to the state array
        state.form = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchForm.pending, (state, action) => {
        // Add user to the state array
        state.loading = true;
      })
      .addCase(saveUpdatedForm.fulfilled, (state, action) => {
        // Add user to the state array
        state.list = action.payload.data;
        state.isSavingForm = false;
      })
      .addCase(saveUpdatedForm.pending, (state, action) => {
        // Add user to the state array
        state.isSavingForm = true;
      });
  },
});

export const formActions = formSlice.actions;
export default formSlice.reducer;
