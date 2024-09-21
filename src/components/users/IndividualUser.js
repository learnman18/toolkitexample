import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const IndividualUser = () => {

    const { id } = useParams();
    console.log("id", parseInt(id));
    // const dispatch =  useDispatch();
    const individualResponse = useSelector((state)=>state.singleUser.individualUserData);
    const singleUserData = useSelector((state)=>state.users.singleUserData);
    console.log("individualResponse" , singleUserData);

    return(
        <>
        {
            parseInt(id) === singleUserData.id && 
            <div>
                <h2 className="text-32">{singleUserData.name}</h2>
                <p className="text-lg">Username - {singleUserData.username}</p>
                <p className="text-lg">Email - {singleUserData.email}</p>
            </div>
        }
            
        </>
    )
}

export default IndividualUser;