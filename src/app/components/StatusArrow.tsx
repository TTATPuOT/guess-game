import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'
import { GameMetricStatus } from '@t/GameData'
import { Badge } from '@radix-ui/themes'

interface StatusArrowProps {
    status: GameMetricStatus
}

export default function StatusArrow({ status }: StatusArrowProps) {
    if (status == GameMetricStatus.LESS) {
        return (
            <Badge color="gray" radius="full">
                <ArrowUpIcon width="12" height="12" />
            </Badge>
        )
    } else if (status == GameMetricStatus.GREATER) {
        return (
            <Badge color="gray" radius="full">
                <ArrowDownIcon width="12" height="12" />
            </Badge>
        )
    } else {
        return null
    }
}
