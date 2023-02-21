import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import carService from "./carService";
import { toast } from "react-toastify";

const initialState = {
  car: {},
  cars: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
  totalValue: 0,
  totalCars: 0,
  hotCar: {},
};

export const createCar = createAsyncThunk(
  "cars/create",
  async (formData, thunkAPI) => {
    try {
      return await carService.createCar(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getCars = createAsyncThunk("cars/getCars", async (_, thunkAPI) => {
  try {
    return await carService.getCars();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});
export const delCar = createAsyncThunk(
  "cars/delCars",
  async (slug, thunkAPI) => {
    try {
      return await carService.deleteCar(slug);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getCar = createAsyncThunk(
  "cars/getCar",
  async (slug, thunkAPI) => {
    try {
      return await carService.getCar(slug);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCar = createAsyncThunk(
  "cars/updateCar",
  async ({ slugs, formData }, thunkAPI) => {
    try {
      return await carService.updateCar(slugs, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getHotCar = createAsyncThunk(
  "cars/getHotCar",
  async (_, thunkAPI) => {
    try {
      return await carService.getHotCar();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const patchHotCar = createAsyncThunk(
  "cars/patchHotCar",
  async (slug, thunkAPI) => {
    try {
      return await carService.patchHotCar(slug);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const carSlice = createSlice({
  name: "Car",
  initialState,
  reducers: {
    CALC_TOTAL_VALUE(state, action) {
      const cars = action.payload;
      const array = [];
      cars.map((car) => {
        const { pret } = car;
        return array.push(pret);
      });
      const totalValue = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalValue = totalValue;
    },
    CALC_TOTAL_CARS(state, action) {
      const cars = action.payload;
      state.totalCars = cars.length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.cars.push(action.payload);
        toast.success("Car added successfully");
      })
      .addCase(createCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getCars.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.cars = action.payload;
      })
      .addCase(getCars.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(delCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delCar.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Car deleted successfully");
      })
      .addCase(delCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.car = action.payload;
      })
      .addCase(getCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(patchHotCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(patchHotCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.hotCar = action.payload;
        toast.success("Hot Car sucessfully set");
      })
      .addCase(patchHotCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getHotCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHotCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.hotCar = action.payload;
      })
      .addCase(getHotCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Car updated successfully");
      })
      .addCase(updateCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { CALC_TOTAL_VALUE } = carSlice.actions;
export const { CALC_TOTAL_CARS } = carSlice.actions;

export const selectTotalValue = (state) => state.car.totalValue;
export const selectTotalCars = (state) => state.car.totalCars;
export const selectCar = (state) => state.car.car;
export const selectHotCar = (state) => state.car.hotCar;

export default carSlice.reducer;
