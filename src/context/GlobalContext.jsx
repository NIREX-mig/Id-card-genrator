'use client';

import { createContext, useState, useContext } from "react";

const globalcontext = createContext();

export const GlobalState = ({ children }) => {
    const [formData, setFormData] = useState("");

    return (
        <globalcontext.Provider value={{ formData, setFormData }}>
            {
                children
            }
        </globalcontext.Provider>
    )
};

export const useGlobalContext = () => {
    return useContext(GlobalState);
}