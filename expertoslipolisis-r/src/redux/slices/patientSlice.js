import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:4002/patients";

export const createPatient = createAsyncThunk(
  "patients/createPatient",
  async (patientData) => {
    const { data } = await axios.post(URL, patientData);
    return data;
  }
);

const patientSlice = createSlice({
  name: "patients",
  initialState: {
    patient: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetPatientState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.patient = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.patient = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(createPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
        state.patient = null;
      });
  },
});

export const { resetPatientState } = patientSlice.actions;
export const selectPatient = (state) => state.patients?.patient;
export const selectPatientLoading = (state) => state.patients?.loading;
export const selectPatientError = (state) => state.patients?.error;
export const selectPatientSuccess = (state) => state.patients?.success;

export default patientSlice.reducer;
