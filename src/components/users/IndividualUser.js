import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { displayUserById, fetchDisplayUser } from "../Store/slices/UsersSlice";
// import IndividualUserPost from "./IndividualUserPost";
import CreateEditPost from "./CreateNewPost";
import Spinner from "../spinner/Spinner";

const IndividualUser = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const allUsers = useSelector((state) => state.users.responseData);
    const individualResponse = useSelector((state) => state.users.singleUserData);
    const status = useSelector((state) => state.users.status);

    // Fetch all users if not already fetched
    useEffect(() => {
        if (allUsers.length === 0) {
            dispatch(fetchDisplayUser());
        } else {
            //if user.id is same as id of use params, store the details of that particular user
            const user = allUsers.find((user) => user.id === parseInt(id));
            // console.log("user fetched", user)
            if (user) {
                dispatch(displayUserById(user));
            }
        }
    }, [dispatch, id, allUsers]);

    // Dispatch `displayUserById` once the user list is fetched
    // useEffect(() => {
    //     if (status === 'Successful' && !individualResponse) {
    //         //if user.id is same as id of use params, store the details of that particular user
    //         const user = allUsers.find((user) => user.id === parseInt(id));
    //         console.log("user already fetched", user)
    //         if (user) {
    //             dispatch(displayUserById(user));
    //         }
    //     }
    // }, [status, allUsers, id, dispatch, individualResponse]);

    if (status === 'Loading') {
        return(
            <>
                <Spinner></Spinner>
            </>
        );
    }

    if (!individualResponse) {
        return <div>No user data found.</div>;
    }

    return (
        <>
            <div className="pb-5">
                <h1>Hello This is test</h1>
                <h2 className="text-32">{individualResponse.name}</h2>
                <p className="text-lg">Username - {individualResponse.username}</p>
                <p className="text-lg">Email - {individualResponse.email}</p>
            </div>
            <div>
                <CreateEditPost userId = {individualResponse.id}></CreateEditPost>
            </div>
            {/* <IndividualUserPost clickedUserId={id}></IndividualUserPost> */}
        </>
    );
};

export default IndividualUser;
