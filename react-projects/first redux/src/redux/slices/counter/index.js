import { createSlice } from "@reduxjs/toolkit";


export const counterSlice = createSlice({
  initialState: {
    value: 0
  },
  name: "counter",
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    clear: state => {
      state.value = 0
    },
  }
})

// this is for despacher
export const { increment, decrement,clear } = counterSlice.actions;

// this is form main file <-- store.js
export default counterSlice.reducer