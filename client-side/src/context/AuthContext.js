import { createContext,useReducer } from "react";
import { AuthReducer } from "./AuthReducer";


const INITIAL_STATE={
    user:{ _id:"61e44c072b64075f789de842",
        username:"Vijay",
        email:"vj@gmail.com",
        profilePicture:"person/1.jpeg",
        coverPicture:"",
        followers:[],
        following:["61e5460adc9e5abdcedbb477"],
        createdAt:"2022-01-16T16:47:03.267+00:00",
        updatedAt:"2022-01-17T14:25:59.656+00:00",
        description:"Hello all",
        city:"New York",
        from:"Madrid",
        relationship:1,}
        
    ,
    isFetching:false,
    error:false
};

export const AuthContext=createContext(INITIAL_STATE);

export const AuthContextProvider=({children})=>{
    const [state,dispatch] = useReducer(AuthReducer,INITIAL_STATE);
   
    return (
    <AuthContext.Provider
             value={{
                 user:state.user,
                 isFetching:state.isFetching,
                 error:state.error,
                 dispatch,
             }}
    >
      {children}
    </AuthContext.Provider>
    )
}
 