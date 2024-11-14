import { configureStore } from "@reduxjs/toolkit";
import DisplayUser from '../Store/slices/UsersSlice'
import DisplayFetchIndividualUserDetails from '../Store/slices/IndividualUserSlice'

export const store = configureStore({
    // msg : console.log("inside store"),
    reducer : {
        users : DisplayUser,
        singleUser : DisplayFetchIndividualUserDetails
    }
})

// console.log("store", store.reducer.allUsers)
