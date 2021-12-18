import dynamic from 'next/dynamic'

export const Waveform = dynamic(
    () => import('./wavesurfer'),
    {ssr: false}
)