import React ,{createContext, useReducer} from 'react';
import { reducer, initialState } from './Reducer';

export const DataContext = createContext()

const Provider =({children}) => {

        const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <DataContext.Provider value={{state, dispatch}}>
            {children}
        </DataContext.Provider>
    )
}

export default Provider;