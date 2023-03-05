import { useState, useEffect, useReducer } from "react"

import {db} from '../firebase/config'
import { collection, addDoc, Timestamp } from "firebase/firestore"

const initialConfig = {
    loading: null,
    error: null
}

const insertReducer = (state, action) => {
    switch(action.type) {
        case 'loading':
            return {loading: true, error: false}
        case 'inserted_doc':
            return {loading: false, error: false}
        case 'error':
            return {loading: false, error: true}
        default:
            return state
    }
}


export const useInsertDocument = (docCollection) => {
    const [response, dispatch] = useReducer(insertReducer, initialConfig)

    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    }

    const insertDocument = async () => {
        checkCancelBeforeDispatch({
            type: 'loading',
        })
        try {
            const newDocument = {...document, createdAt: Timestamp.now()}
            const insertDocument = await addDoc(
                collection(db, docCollection),
                newDocument
            )
            checkCancelBeforeDispatch({
                type: 'inserted_doc',
                payload: insertDocument
            })
        } catch (error) {
            checkCancelBeforeDispatch({
                type: 'error',
                payload: error.message
            })
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])
    
    return {insertDocument, response}
}