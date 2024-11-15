import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { UserPostsAction } from "../actions/UserPostsAction";
import { fetchIndividualUserDetails, storeUserPostId } from "../Store/slices/IndividualUserSlice";
import { Link } from "react-router-dom";
import Spinner from "../spinner/Spinner";

/* we are getting this props from the User.js file, we are passing the ID from their and we are accessing it here and
passing it as parameter in fetchIndividualUserDetails() fucntion, and we are accessing this id in userpostaction.js file.
*/

const CreateEditPost = (props) => {

    const [userPosts , setUserPosts] = useState([]);
    const [userPostShowHide , setuserPostShowHide] = useState(false);
    const [editPostId, setEditPostId] = useState(null);
    const [postTitleUpdate, setPostTitleUpdate] = useState("");
    const [postContentUpdate, setPostContentUpdate ] = useState("");


    const dispatch = useDispatch();
    const postData = useSelector((state)=>state.singleUser.individualUserData);
    const status = useSelector((state)=>state.singleUser.status);
    // console.log("postData" , postData);
    
    useEffect(()=>{
        dispatch(fetchIndividualUserDetails(props.userId));
    },[dispatch, props.userId])

    useEffect(()=>{
        if(postData.length){
            setUserPosts(postData);
        }
    },[postData])

    // console.log("userPosts create", userPosts)
    
    //Add new post button
    const showHidePost = () =>{
        // console.log("test");
        userPostShowHide === false ? setuserPostShowHide(true) : setuserPostShowHide(false); 
    }
    //Edit post button
    const editPost = (postTitle, postBody, postID) =>{
        setEditPostId(postID);
        setPostTitleUpdate(postTitle);
        setPostContentUpdate(postBody);

    /*
    // let text = event.target.parentElement.previousElementSibling.previousElementSibling.firstElementChild.nodeName; 
        // console.log("text", text)
        console.log("edit post" , postID);
        console.log("event" );
        let title = document.querySelector(".card_title");
        let content = document.querySelector(".card_content");

        let createInputText = document.createElement("input");
        createInputText.type =  "text";
        createInputText.placeholder =  "enter title";
        createInputText.classList.add("text-black");
        createInputText.value = postTitle;
        title.replaceWith(createInputText);

        const createContnetTextArea = document.createElement("textarea");
        createContnetTextArea.placeholder = "enter body content";
        createContnetTextArea.classList.add("text-black");
        createContnetTextArea.value = postBody;
        content.replaceWith(createContnetTextArea);
    */
            
    }
    const AddNewNote = () => {
        if((postTitleUpdate === "") || (postContentUpdate === "")){
            alert("none of the fields can be empty");
        }
        
        const newPost = {
            id: userPosts.length + 1,
            title : postTitleUpdate,
            body : postContentUpdate
        }
        // console.log("newPost", newPost)
        // to add the new post on top
        setUserPosts([newPost, ...userPosts]); 
        //to add new post on botom
        // setUserPosts([...userPosts, newPost]); 

        setPostTitleUpdate('');
        setPostContentUpdate('');
        setuserPostShowHide(false);
    }

    const CancelNewNote = () =>{
        setuserPostShowHide(false)
    }

    const newPostTitle = (e) => {
        let x = e;
        setPostTitleUpdate(x);
    }

    const newPostBody = (e) => {
        let y = e;
        setPostContentUpdate(y);
    }

    const deletePost = (itemID) => {
        let deletedPost = userPosts.filter((item)=>{
            // return console.log("item" , item.id, "itemID" , itemID);
            return item.id !== itemID ? item : ""
        })
        setUserPosts(deletedPost);
    }

    const updatePost = (itemID) => {
        const updatedPost = userPosts.map((post)=>
            post.id === itemID ? {...post, title: postTitleUpdate, body:postContentUpdate} : post
        )
        setUserPosts(updatedPost);
        setEditPostId("");
    }

    const cancelPost = () => {
        setEditPostId(""); //it will make editPostId empty so it won't be equal to item.id and it will display else part
    }

    const titleUpdate = (event) => {
        let y = event.target.value;
        setPostTitleUpdate(y);
    }

    const contentUpdate = (event) =>{
        let x = event.target.value;
        setPostContentUpdate(x);
    }

    const ownerIdGettingFromPost = (ownerAllDetails) =>{
        //When sending data to a web server, the data has to be a string. by using this method we convert JS object to string.
        localStorage.setItem('userPostDetail', JSON.stringify(ownerAllDetails));
        dispatch(storeUserPostId(ownerAllDetails));
    }

    if (status === 'Loading') {
        return(
            <>
                <Spinner></Spinner>
            </>
        );
    }

    return(
        <>
            <div className="w-1/2 pt-5">
                <div>
                    <button className="py-2 px-6 bg-emeraledLight rounded-sm" onClick={showHidePost}>Add New Post</button>
                    {
                        userPostShowHide === true && 
                        <div>
                            <div>
                                <span>Title</span>
                                <input type="text" className="form-input text-black"
                                onChange={(e)=>newPostTitle(e.target.value)}/>
                            </div>
                            <div>
                                <span>Content</span>
                                <textarea name="" id="" className="form-textarea text-black"
                                onChange={(e)=>newPostBody(e.target.value) }></textarea>
                            </div>
                            <button className="py-2 px-6 bg-limeLight rounded-sm" onClick={AddNewNote}>Add Note</button>
                            <button className="py-2 px-6 bg-lightRed rounded-sm" onClick={CancelNewNote}>Cancel Note</button>
                        </div>
                    } 
                </div>
                <div className="pt-5">
                    {
                        userPosts && userPosts.map((item)=>(
                            <div key={item.id}>
                            {
                                editPostId === item.id ? (
                                    <div>
                                        <div>
                                            <span>Title</span>
                                            <input type="text" className="form-input text-black"
                                            onChange={(event)=>titleUpdate(event)} value={postTitleUpdate} />
                                        </div>
                                        <div>
                                            <span>Content</span>
                                            <textarea name="" id="" className="form-textarea text-black"
                                            onChange={(event)=>contentUpdate(event)} value={postContentUpdate}></textarea>
                                        </div>
                                        <div>
                                            <button className="py-2 px-6 bg-limeLight rounded-sm"
                                            onClick={()=>updatePost(item.id)}>Update</button>
                                            <button className="py-2 px-6 bg-lightRed rounded-sm"
                                            onClick={()=>cancelPost()}>Cancel</button>
                                        </div>
                                    </div>
                                    ) : (
                                    <div>
                                        <div>
                                            <Link to={`/posts/${item.id}`} onClick={()=>ownerIdGettingFromPost(item)} className="card_title text-cyan-700 font-semibold text-xl">
                                                {item.title}
                                            </Link>
                                        </div>
                                        <div>
                                            <p className="card_content">{item.body}</p>
                                        </div>
                                        <div>
                                            <button className="py-2 px-6 bg-limeLight rounded-sm"
                                            onClick={()=>editPost(item.title, item.body, item.id)}>Edit</button>
                                            <button className="py-2 px-6 bg-lightRed rounded-sm"
                                            onClick={()=>deletePost(item.id)}>Delete</button>
                                        </div>
                                    </div>
                                )
                            }  
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default CreateEditPost;