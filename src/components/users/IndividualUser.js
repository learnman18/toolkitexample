// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { displayUserById, fetchDisplayUser } from "../Store/slices/UsersSlice";


// const IndividualUser = () => {

//     const { id } = useParams();
//     console.log("id", parseInt(id));
//     const dispatch =  useDispatch();
//     const individualResponse = useSelector((state)=>state.users.responseData);
//     const singleUserData = useSelector((state)=>state.users.singleUserData);
//     console.log('singleUserData', singleUserData);
//     console.log('individualResponse', individualResponse);

//     useEffect(()=>{
//         if(!singleUserData.length){
//             console.log("inside singleuser", singleUserData)
//             dispatch(fetchDisplayUser());
//         }else{
//             const user = singleUserData.find((user)=>user.id === parseInt(id));
//             if(user){
//                 dispatch(displayUserById(user));
//             }
//         }
//     },[dispatch, id, singleUserData]);

//     useEffect(()=>{
//         if(!individualResponse){
//             dispatch(fetchDisplayUser());
//             dispatch(displayUserById(id)); // id coming from useParams
//             console.log("individualResponse effect" , individualResponse)
//         }
//     },[id, dispatch, individualResponse])

//     // console.log("individualResponse" , singleUserData);

//     return(
//         <>
//             <div>
//                 <h2 className="text-32">{singleUserData.name}</h2>
//                 <p className="text-lg">Username - {singleUserData.username}</p>
//                 <p className="text-lg">Email - {singleUserData.email}</p>
//             </div>
//         </>
//     )
// }

// export default IndividualUser;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { displayUserById, fetchDisplayUser } from "../Store/slices/UsersSlice";

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
            const user = allUsers.find((user) => user.id === parseInt(id));
            console.log("user", user)
            if (user) {
                dispatch(displayUserById(user));
            }
        }
    }, [dispatch, id, allUsers]);

    // Dispatch `displayUserById` once the user list is fetched
    useEffect(() => {
        if (status === 'Successful' && !individualResponse) {
            const user = allUsers.find((user) => user.id === parseInt(id));
            console.log("user", user)
            if (user) {
                dispatch(displayUserById(user));
            }
        }
    }, [status, allUsers, id, dispatch, individualResponse]);

    if (status === 'Loading') {
        return <div>Loading...</div>;
    }

    if (!individualResponse) {
        return <div>No user data found.</div>;
    }

    return (
        <div>
            <h2 className="text-32">{individualResponse.name}</h2>
            <p className="text-lg">Username - {individualResponse.username}</p>
            <p className="text-lg">Email - {individualResponse.email}</p>
        </div>
    );
};

export default IndividualUser;
