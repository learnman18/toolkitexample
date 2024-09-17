import { configureStore } from "@reduxjs/toolkit";
import DisplayUser from '../Store/slices/UsersSlice'

export const store = configureStore({
    msg : console.log("inside store"),
    reducer : {
        users : DisplayUser
    }
})

// console.log("store", store.reducer.allUsers)
