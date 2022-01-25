import { ReactNode } from 'react';
import styles from './collapse.module.scss'
import typo from  '../assets/styles/Typo.module.scss'

export const Collapse = ({ children, heading }: { children: ReactNode, heading: String}): JSX.Element => {
    return (
        <div className={ styles.wrap }>
            <details className={ styles.container } open>
                <summary className={ styles.header }>
                    <h3 className={ typo.headingMedium }>
                        { heading }
                    </h3>
                </summary>
                <div className={ styles.content }>{ children }</div>
            </details>
        </div>
    )
}
