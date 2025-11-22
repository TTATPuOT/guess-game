import { Avatar, Box, Flex, Text } from '@radix-ui/themes'
import { useMemo } from 'react'

interface SearchResultProps {
    name: string
    imageUrl: string
    disabled: boolean
    selected: boolean
    callback: () => void
}

export default function SearchResult({
    name,
    imageUrl,
    callback,
    disabled,
    selected
}: SearchResultProps) {
    const classes = useMemo(() => {
        if (disabled) {
            return 'search-result-disabled'
        }

        if (selected) {
            return 'search-result search-result-hover'
        }

        return 'search-result'
    }, [disabled, selected])

    return (
        <Box className={classes} onClick={!disabled ? callback : () => {}} tabIndex={-1}>
            <Flex gap="3" align="center" p="2">
                <Avatar size="2" src={imageUrl} fallback={name} />
                <Box>
                    <Text as="div" size="4" weight="bold">
                        {name}
                    </Text>
                </Box>
            </Flex>
        </Box>
    )
}
