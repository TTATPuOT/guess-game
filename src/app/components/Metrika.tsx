'use client'

import { MetrikaCounter } from 'react-metrika'
import { YANDEX_METRIKA_ID } from '@/app/constatnts'
import React from 'react'

export default function Metrika() {
    return (
        <MetrikaCounter
            id={YANDEX_METRIKA_ID}
            options={{
                trackHash: true,
                webvisor: true,
                clickmap: true,
                trackLinks: true
            }}
        />
    )
}
