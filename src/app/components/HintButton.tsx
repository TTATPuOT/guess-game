import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import secondToTime from '@/app/utils/secondToTime'
import { Button } from '@radix-ui/themes'
import { useCountdown } from 'usehooks-ts'
import GuessContext from '@/app/contexts/GuessContext'
import getHintFromGame from '@/app/utils/getHintFromGame'
import { HINT_COUNTDOWN, YANDEX_METRIKA_ID } from '@/app/constatnts'
import { ym } from 'react-metrika'

export default function HintButton() {
    const { game, guesses, hintData, setHintData } = useContext(GuessContext)
    const [clicked, setClicked] = useState<boolean>(false)

    const [countdown, { startCountdown, resetCountdown }] = useCountdown({
        countStart: HINT_COUNTDOWN,
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

        ym(YANDEX_METRIKA_ID, 'reachGoal', 'hint')
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
