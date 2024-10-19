import React, { useEffect } from "react";
import { fetchIndividualUserDetails } from "../Store/slices/IndividualUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


const IndividualUserPost = (props) => {

    const dispatch = useDispatch();
    const userPost = useSelector((state)=>state.singleUser.individualUserData);

    // console.log("userPost", userPost);
    

    useEffect(()=>{
        dispatch(fetchIndividualUserDetails(props.clickedUserId));
    },[dispatch, props.clickedUserId])

    // const ownerIdGettingFromPost = (ownerId) =>{
    //     console.log("hello", ownerId);
    //     if(ownerId === parseInt(postId)){
    //         dispatch(displayUserById(postOwner));
    //         onClick={()=>ownerIdGettingFromPost(posts.userId)}
    //     }
    // }

    return(
        <>
            {
                userPost.map((posts)=>(
                    <div className="pb-5" key={posts.id}>
                        <div>
                            <span className="font-semibold">Title : </span>
                            <Link className="underline underline-offset-1 text-cyan-700"
                             to={`/posts/${posts.id}`}>{posts.title}</Link>
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