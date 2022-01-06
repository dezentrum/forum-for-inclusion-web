import dynamic from 'next/dynamic'

import { Recording } from '../models/types'

// Import dynamically as wavesurfer.js does not work using SSR (relies on the window object)
const Audio = dynamic(
    () => import('./audio'),
    { ssr: false }
)

export const AudioCaller =  ({ recording, index }: { recording: Recording, index: number }) => {
    return <Audio recording={recording} index={index}/>
}