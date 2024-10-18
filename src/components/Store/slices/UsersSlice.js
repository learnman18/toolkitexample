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
        error : null,
        singleUserData : []
    },
    reducers : {
        displayUserById(state , action){
            // console.log("display state", state);
            console.log("display user", action.payload);
            state.singleUserData = action.payload;
        }
    },
    extraReducers(builder){
        builder.addCase(fetchDisplayUser.pending, (state)=>{
            state.status = 'Loading';
        })
        .addCase(fetchDisplayUser.fulfilled, (state, action)=>{
            state.status = 'Successful';
            // console.log("fuliled payload", action.payload);
            state.responseData = action.payload;
        })
        .addCase(fetchDisplayUser.rejected, (state, action) => {
            state.status = 'Error';
            state.error = action.error.message;
        })
    }
})

console.log("dispplayUser", DispalyUsers.actions)

/* we will pass the reducers from here so we can directly access it in store. and remember we write reducers
but while passing the reducers we will use reducer not reducers.
*/
export default DispalyUsers.reducer;
//exporting the reducer so it can be accessed in users.js file and 
export const { displayUserById } = DispalyUsers.actions;