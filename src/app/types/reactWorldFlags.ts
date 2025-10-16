interface ReactWorldFlagsProps {
    code: string
    style: Object
}

declare module 'react-world-flags' {
    import { ReactNode } from 'react'

    export default function (props: ReactWorldFlagsProps): ReactNode
}
