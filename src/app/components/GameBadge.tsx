import { GameMetricCorrect, GameTag } from '@t/GameData'
import { Badge, Text } from '@radix-ui/themes'
import { useMemo } from 'react'

interface BadgeProps extends GameTag {
    size?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
}

export default function GameBadge({ name, status, size }: BadgeProps) {
    const textSize = useMemo(() => size ?? '2', [size])

    if (status === GameMetricCorrect.CORRECT) {
        return (
            <Badge color="grass" radius="full">
                <Text size={textSize} mx="2">
                    {name}
                </Text>
            </Badge>
        )
    } else if (status === GameMetricCorrect.SIMILAR) {
        return (
            <Badge color="amber" radius="full">
                <Text size={textSize} mx="2">
                    {name}
                </Text>
            </Badge>
        )
    }

    return (
        <Badge color="gray" radius="full">
            <Text size={textSize} mx="2">
                {name}
            </Text>
        </Badge>
    )
}
