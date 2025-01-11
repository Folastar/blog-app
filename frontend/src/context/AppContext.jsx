import { createContext,useEffect,useReducer} from "react";

export const AppContext= createContext();
export const AppProvider= ({children})=>{

    const initialState ={
        user:null,
        blog:null
    }

    const  appReducer=(state,action)=>{
        switch(action.type){
            case "LOGIN":
                return {...state,
                    user:action.payload //data gotten from bckend server
                }

                case "LOGOUT":
                    return{
                        ...state,
                        user:null
                    }

                    default:
                        return state
        }
    }   //state and actions are the parametes use reducer takes in


    useEffect(()=>{

        try{
            const user =JSON.parse(localStorage.getItem("pantone")) || null
            console.log(user);
            if(user){
                dispatch({type:"LOGIN", payload:user})
            }

        }catch (error) {
            console.error("Error parsing user from localStorage:", error);
            localStorage.removeItem("pantone"); // Clear corrupted data if needed
          }
    },[])
    const [state,dispatch]=useReducer(appReducer, initialState)
    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}


export default AppProvider