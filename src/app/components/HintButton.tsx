import secondToTime from '@/app/utils/secondToTime'
import { Button } from '@radix-ui/themes'
import { useCountdown } from 'usehooks-ts'
import { useCallback, useEffect, useMemo, useState } from 'react'

export default function HintButton() {
    const [clicked, setClicked] = useState<boolean>(false)

    const [countdown, { startCountdown }] = useCountdown({
        countStart: 5,
        intervalMs: 1000
    })

    useEffect(() => {
        startCountdown()
    }, [])

    const isHintAvailable = useMemo(() => countdown <= 0, [countdown])

    const handeClick = useCallback(() => {
        if (!isHintAvailable) return

        if (!clicked) {
            setClicked(true)
            setTimeout(() => setClicked(false), 3000)
        }
    }, [isHintAvailable, clicked])

    if (clicked) {
        return (
            <Button size="2" color="red" variant="surface" onClick={handeClick}>
                Yes, give it to me
            </Button>
        )
    }

    return (
        <Button
            size="2"
            variant="surface"
            color={isHintAvailable ? 'grass' : 'gray'}
            className={isHintAvailable ? 'animation-button-highlight' : ''}
            disabled={!isHintAvailable}
            onClick={handeClick}>
            {isHintAvailable ? 'Get hint 🎓' : `Get hint available at ${secondToTime(countdown)}`}
        </Button>
    )
}
