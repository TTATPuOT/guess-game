'use client'

import React from 'react'
import { Button } from '@radix-ui/themes'
import useAuth from '@/app/hooks/useAuth'
import ProfileModal from '@/app/components/ProfileModal'

export default function AuthButton() {
    const { isLoading, user, authWithGoogleCallback } = useAuth()

    if (isLoading) {
        return null
    }

    if (user != null) {
        return <ProfileModal />
    }

    return (
        <Button size="1" variant="surface" radius="large" onClick={authWithGoogleCallback}>
            Sign-up with Google
        </Button>
    )
}
