import { async } from '@firebase/util'
import {db} from '../firebase/config'
import {
    getAuth, 
    createUserWithEmailAndPassword,
    singInUserWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import { useState, useEffect } from 'react'

export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    //cleanup
    const [cancelled, setCancelled] = useState(false)
    
    const auth = getAuth()

    const checkIfisCancelled = () => {
        if (cancelled) {
            return
        }
    }

    const createUser = async (data) => {
        checkIfisCancelled()
        setLoading(true)
        setError(null)

        try {
            
            const {user}  = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.pass,
            )

            await updateProfile(user, {
                displayName: data.name
            })
            
            setLoading(false)

            return user

        } catch (error) {
            let systemErrorMessage

            if (error.message.includes('password')) {
                systemErrorMessage = 'A senha deve conter ao menos 6 caracteres'
            } else if (error.message.includes('email-already')) {
                systemErrorMessage = 'Email já cadastrado'
            } else {
                systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde'
            }

            setError(systemErrorMessage)
            setLoading(false)
        }
    }

    useEffect(() => {
        return () => setCancelled()
    }, [])

    return {
        auth, 
        createUser, 
        error, 
        loading
    }
}