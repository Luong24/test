import React from "react";
import { createAccountStore } from "../mobxStore/AccountStore";
import { useLocalStore } from 'mobx-react'
const MobxContext = React.createContext(null);

export const MobxProvider = ({ children }) => {
    const mobxStore = useLocalStore(createAccountStore)
    return <MobxContext.Provider value={mobxStore}>
        {children}
    </MobxContext.Provider>
}

export const useAccountStore = () => React.useContext(MobxContext)