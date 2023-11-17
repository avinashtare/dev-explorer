import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchUsers = createAsyncThunk("fetchUsers", async (dispatch, { getState }) => {
    let state = getState().usersAPI;
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${state.userid}`);
    return response.json();
});

export const usersLoader = createSlice({
    name: "usersLoader",
    initialState: {
        data: [],
        userid: 1,
        isLoading: false,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.data = [...state.data, action.payload];
            state.userid += 1;
            state.isLoading = false;
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.isError = true;
            console.log("Error: ", action.payload)
        })
    },
});

export default usersLoader.reducer;