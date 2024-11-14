import React, { useEffect } from "react";
import { fetchIndividualUserDetails, storeUserPostId } from "../Store/slices/IndividualUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


const IndividualUserPost = (props) => {

    const dispatch = useDispatch();
    const userPost = useSelector((state)=>state.singleUser.individualUserData);

    // console.log("userPost", userPost);

    useEffect(()=>{
        dispatch(fetchIndividualUserDetails(props.clickedUserId));
    },[dispatch, props.clickedUserId])

    const ownerIdGettingFromPost = (ownerAllDetails) =>{
        //When sending data to a web server, the data has to be a string. by using this method we convert JS object to string.
        localStorage.setItem('userPostDetail', JSON.stringify(ownerAllDetails));
        dispatch(storeUserPostId(ownerAllDetails));
    }

    return(
        <>
            {
                userPost.map((posts)=>(
                    <div className="pb-5" key={posts.id}>
                        <div>
                            <span className="font-semibold">Title : </span>
                            <Link className="underline underline-offset-1 text-cyan-700"
                             to={`/posts/${posts.id}`} onClick={()=>ownerIdGettingFromPost(posts)}>{posts.title}</Link>
                        </div>
                        <div>
                            <span className="font-semibold">Body : </span><span>{posts.body}</span>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default IndividualUserPost;