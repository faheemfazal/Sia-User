import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hub: null,
  token: null,
  name: null
 
};
export const cliendSliceReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      console.log(action);
      console.log(state);
      state.hub = action.payload.hub;
      state.token = action.payload.token;
      state.name = action.payload.name;

     

    },
    setLogout: (state, action) => {
      state.hub = null;
      state.token = null;
      state.name = null
  
    },
  },
});

export const { setLogin, setLogout } = cliendSliceReducer.actions;

export default cliendSliceReducer.reducer;
