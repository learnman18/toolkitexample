import React from "react";
import { Link } from "react-router-dom";

const UserInnerPost = () => {

    // const { postId } = useParams();
    /*
        we can use all the reducers from usersSlice and IndividualUserSlice to get all the data but here we are using
        localstroage and all those data are coming only from the reducers but we are accessing those data here on
        this page by using localStorage.getItem(), if you check the Users.js and IndividualUserPost.js file
        there I'm storing all the data in localstorage on click event.
    */

    //we are getting this localstrorage item from the individualUserPost.js file.
    //when receiving the data from web sever it's in string fromat to make it javascript oobject we parse it. 
    const getUserPostDetail = JSON.parse(localStorage.getItem("userPostDetail"));
    // console.log('getUserPostDetail', getUserPostDetail)

    //we are getting this localstrorage item from the Users.js file.
    const getPostOwnerDetail = JSON.parse(localStorage.getItem("postOwnerDetail"));
    // console.log("getPostOwnerDetail", getPostOwnerDetail);

    return(
        <>
            <p>Posted by : <Link to={`/users/${getPostOwnerDetail.id}`} className="text-cyan-700 underline">{getPostOwnerDetail && getPostOwnerDetail.name}</Link></p>
            <p>Username : {getPostOwnerDetail && getPostOwnerDetail.username}</p>
            <p>Title : {getUserPostDetail && getUserPostDetail.title}</p>
        </>
    )
}

export default UserInnerPost;