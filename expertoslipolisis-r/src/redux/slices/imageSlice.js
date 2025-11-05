import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4002/images";

export const fetchImages = createAsyncThunk(
  "images/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/all`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error al cargar imágenes");
    }
  }
);

export const uploadImage = createAsyncThunk(
  "images/upload",
  async ({ before, after, description }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth?.token;
      console.log("[imageSlice] uploadImage - token:", token);

      if (!token)
        return rejectWithValue("No hay token de autenticación (frontend).");

      const formData = new FormData();
      formData.append("beforeImage", before);
      formData.append("afterImage", after);
      formData.append("description", description);

      const res = await axios.post(`${API_URL}/createimage`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (err) {
      console.error(
        "[imageSlice] uploadImage error:",
        err.response || err.message
      );
      return rejectWithValue(
        err.response?.data || err.message || "Error al subir imagen"
      );
    }
  }
);

export const deleteImage = createAsyncThunk(
  "images/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth?.token;
      console.log("[imageSlice] deleteImage - token:", token, "id:", id);

      if (!token)
        return rejectWithValue("No hay token de autenticación (frontend).");

      const res = await axios.delete(`${API_URL}/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return id;
    } catch (err) {
      console.error(
        "[imageSlice] deleteImage error:",
        err.response || err.message
      );
      const backendMsg =
        err.response?.data || err.response?.data?.message || err.message;
      return rejectWithValue(backendMsg || "Error al eliminar imagen");
    }
  }
);

const imagesSlice = createSlice({
  name: "images",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.map((item) => ({
          id: item.id,
          beforeUrl: item.beforeImage
            ? `data:image/jpeg;base64,${item.beforeImage}`
            : "/placeholder.jpg",
          afterUrl: item.afterImage
            ? `data:image/jpeg;base64,${item.afterImage}`
            : "/placeholder.jpg",
          description: item.description || "",
        }));
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPLOAD
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((img) => img.id !== action.payload);
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default imagesSlice.reducer;
