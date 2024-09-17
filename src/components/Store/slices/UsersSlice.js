import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchDisplayUser = createAsyncThunk('fetchDisplayUser',
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        console.log("response", response);
        return response.json();
    }
)

const DispalyUsers = createSlice({
    name : "allUsers",
    initialState : {
        responseData: [],
        status : 'idle',
        error : null
    },
    reducers : {},
    extraReducers(builder){
        builder.addCase(fetchDisplayUser.pending, (state)=>{
            state.status = 'Loading';
        })
        .addCase(fetchDisplayUser.fulfilled, (state, action)=>{
            state.status = 'Successful';
            console.log("fuliled payload", action.payload);
            state.responseData = action.payload;
        })
        .addCase(fetchDisplayUser.rejected, (state, action) => {
            state.status = 'Error';
            state.error = action.error.message;
        })
    }
})

console.log("dispplayUser", DispalyUsers.state)

/* we will pass the reducers from here so we can directly access it in store. and remember we write reducers
but while passing the reducers we will use reducer not reducers.
*/
export default DispalyUsers.reducer;