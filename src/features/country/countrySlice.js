import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  countries: [],
  oneCountry: {},
  loading: "idle",
};

const POST_URL = "https://restcountries.com/v3.1/all";

export const getCountryThunk = createAsyncThunk(
  "country/getCountryThunk",
  async () => {
    const res = await axios.get(POST_URL);
    console.log(res.data);
    return res.data;
  }
);
export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    getCountry: (state, action) => {
      state.oneCountry = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getCountryThunk.fulfilled, (state, action) => {
      state.countries = action.payload;
      console.log("fulfilled");
    });
  },
});

export const selectAllCountries = (state) => state.countries.countries;
export const selectOneCountries = (state) => state.countries.oneCountry;
export const { getCountry } = countrySlice.actions;
export default countrySlice.reducer;
