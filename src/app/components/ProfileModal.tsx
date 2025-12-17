import React from 'react'
import { Button, Flex, Text, Dialog } from '@radix-ui/themes'
import useAuth from '@/app/hooks/useAuth'

export default function ProfileModal() {
    const { isLoading, user, logoutCallback } = useAuth()

    if (isLoading || !user) {
        return null
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button variant="surface" radius="large">
                    {user.displayName}
                </Button>
            </Dialog.Trigger>
            <Dialog.Content size="4">
                <Dialog.Title mb="5">Important information about your anonymity</Dialog.Title>
                <Dialog.Description />

                <Text as="p">
                    Your name ({user.displayName}) will be displayed on public leaderboards
                </Text>

                <Text size="1" as="p">
                    Other personal info, such as email, birthdate, passwords and etc. will not be
                    shown anywhere
                </Text>

                <Text as="p" mt="3" weight="bold">
                    If you do not want this, please log out of your account
                </Text>

                <Flex mt="5">
                    <Button color="red" size="3" variant="surface" onClick={logoutCallback}>
                        Logout
                    </Button>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}
