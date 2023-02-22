import useMediaQuery from "@/hooks/useMediaQuery";
import { createContext, useContext, useReducer, useState } from "react";
interface reviewDataType {
    placeTitle: string;
    address: string;
    placeDescription: string;
}

function reducer(state: any, action: any) {
    switch (action.type) {
        case "SET_SCREEN_SIZE": {
            return { ...state, isBigScreen: action.payload };
        }
        case "OPEN_FULL_FOLDER":
            return {
                ...state,
                openFullTab: true,
                closed: false,
                openAlternatives: false,
                openReview: false,
            };
        case "CLOSE_FULL_FOLDER":
            return {
                ...state,
                openFullTab: false,
                closed: true,
                openAlternatives: false,
                openReview: false,
            };
        case "TOGGLE_ALTERNATIVES":
            return {
                ...state,

                openAlternatives: !state.openAlternatives,
            };

        case "TOGGLE_PLACE_DETAILS":
            if (action.payload) {
                return {
                    ...state,
                    openReview: true,
                    reviewData: action.payload,
                };
            } else {
                return {
                    ...state,
                    openReview: false,
                };
            }
        case "TOGGLE_ALTERNATIVES": {
            return { ...state, openAlternatives: !state.openAlternatives };
        }
        default: {
            console.log("error");
            break;
        }
    }
}

const initialState = {
    isBigScreen: true,
    openFullTab: false,
    closed: true,
    openReview: false,
    reviewData: {} as reviewDataType,
    openAlternatives: false,
};

const PlanTabContext = createContext(null);
const PlanTabDisptachContext = createContext(null);
export function getPlanTabState() {
    return useContext(PlanTabContext);
}
export function getPlanTabDispatch() {
    return useContext(PlanTabDisptachContext);
}
export function PlanTabProvider({ children }: any) {
    const [state, dispatch]: [any, any] = useReducer(reducer, initialState);
    return (
        <PlanTabContext.Provider value={state}>
            <PlanTabDisptachContext.Provider value={dispatch}>
                {children}
            </PlanTabDisptachContext.Provider>
        </PlanTabContext.Provider>
    );
}
