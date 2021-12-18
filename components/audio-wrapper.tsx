import dynamic from 'next/dynamic'

// How to pass down props?
export const AudioWrapper = dynamic(
    () => import('./audio'),
    {ssr: false}
)