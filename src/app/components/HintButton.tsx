import secondToTime from '@/app/utils/secondToTime'
import { Button } from '@radix-ui/themes'
import { useCountdown } from 'usehooks-ts'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import GuessContext from '@/app/contexts/GuessContext'
import getHintFromGame from '@/app/utils/getHintFromGame'

export default function HintButton() {
    const { game, guesses, hintData, setHintData } = useContext(GuessContext)
    const [clicked, setClicked] = useState<boolean>(false)

    const [countdown, { startCountdown, resetCountdown }] = useCountdown({
        countStart: 5,
        intervalMs: 1000
    })

    useEffect(() => {
        startCountdown()
    }, [])

    const isHintAvailable = useMemo(() => countdown <= 0, [countdown])

    const handeClick = useCallback(() => {
        if (!isHintAvailable || !game) return

        if (!clicked) {
            setClicked(true)
            setTimeout(() => setClicked(false), 3000)
            return
        }

        setHintData(getHintFromGame(game, guesses, hintData))

        resetCountdown()
        startCountdown()
        setClicked(false)
    }, [
        isHintAvailable,
        clicked,
        game,
        guesses,
        hintData,
        setHintData,
        resetCountdown,
        startCountdown,
        setClicked
    ])

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
