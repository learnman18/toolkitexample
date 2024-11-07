import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

//using axios
export const fetchIndividualUserDetails = createAsyncThunk("fetchIndividualUserDetails", async(id)=>{
    // console.log("reponse id", id)
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
    // console.log("response data", response.data);
    return response.data;
})

const DisplayFetchIndividualUserDetails = createSlice({
    name : "individualUser",
    initialState : {
        individualUserData : [],
        status : 'idle',
        error : null,
        userPostId : []
    },
    reducers : {
        storeUserPostId(state, action){
            state.userPostId = action.payload;
            console.log("state.userPostId", state.userPostId);
        }
    },
    extraReducers(builder){
        builder.addCase(fetchIndividualUserDetails.pending , (state)=>{
            state.status = 'Loading';
        })
        builder.addCase(fetchIndividualUserDetails.fulfilled, (state, action)=>{
            state.status = 'Successful';
            state.individualUserData = action.payload;
        })
        builder.addCase(fetchIndividualUserDetails.rejected, (state, action)=>{
            state.status = 'Error';
            state.error = action.error.message;
        })
    }
})

export default DisplayFetchIndividualUserDetails.reducer;
export const { storeUserPostId } = DisplayFetchIndividualUserDetails.actions;