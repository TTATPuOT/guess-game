import { GameMetricCorrect, GameTag } from '@t/GameData'
import { Badge, Text } from '@radix-ui/themes'

interface BadgeProps extends GameTag {}

export default function GameBadge({ name, status }: BadgeProps) {
    if (status === GameMetricCorrect.CORRECT) {
        return (
            <Badge color="grass" radius="full">
                <Text size="2" mx="2" my="1">
                    {name}
                </Text>
            </Badge>
        )
    } else if (status === GameMetricCorrect.SIMILAR) {
        return (
            <Badge color="amber" radius="full">
                <Text size="2" mx="2" my="1">
                    {name}
                </Text>
            </Badge>
        )
    }

    return (
        <Badge color="gray" radius="full">
            <Text size="2" mx="2" my="1">
                {name}
            </Text>
        </Badge>
    )
}
