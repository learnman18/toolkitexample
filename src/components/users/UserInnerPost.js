import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { displayUserById, fetchDisplayUser } from '../Store/slices/UsersSlice'

const UserInnerPost = () => {
    
    const dispatch = useDispatch();
    const { postId } = useParams();
    const allUsers = useSelector((state) => state.users.responseData);
    const postOwner = useSelector((state)=>state.users.singleUserData);
    // console.log('postOwner', postOwner)

    useEffect(() => {
        if (allUsers.length === 0) {
            dispatch(fetchDisplayUser());
        } else {
            dispatch(displayUserById(postOwner));
            // if (parseInt(postId)) {
            //     dispatch(displayUserById(postOwner));
            // }
        }
    }, [dispatch, allUsers, postOwner, postId]);

    return(
        <>
            <p>Posted by : {postOwner.name}</p>
            <p>Hello {postId}</p>
        </>
    )
}

export default UserInnerPost;