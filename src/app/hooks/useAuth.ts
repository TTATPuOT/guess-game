import { useCallback, useEffect, useState } from 'react'
import { GoogleAuthProvider, signInWithPopup, User } from '@firebase/auth'
import { auth } from '@/firebase/Firebase'
import { setCookie, deleteCookie } from 'cookies-next/client'

const SESSION_COOKIE_NAME = '__session'
const SESSION_COOKIE_EXPIRES = 60 * 60 * 24 * 28

export default function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        return auth.onAuthStateChanged(() => {
            setUser(auth.currentUser)
            setIsLoading(false)
        })
    }, [])

    const authWithGoogleCallback = useCallback(async () => {
        const provider = new GoogleAuthProvider()

        try {
            await signInWithPopup(auth, provider)

            if (auth.currentUser) {
                setUser(auth.currentUser)

                setCookie(SESSION_COOKIE_NAME, await auth.currentUser.getIdToken(), {
                    maxAge: SESSION_COOKIE_EXPIRES
                })
            }
        } catch (error) {
            console.error('Error signing in with Google', error)
        }
    }, [setUser])

    const logoutCallback = useCallback(async () => {
        try {
            await auth.signOut()

            deleteCookie(SESSION_COOKIE_NAME)
        } catch (error) {
            console.error('Error signing out with Google', error)
        }
    }, [setUser])

    return { isLoading, user, authWithGoogleCallback, logoutCallback }
}
