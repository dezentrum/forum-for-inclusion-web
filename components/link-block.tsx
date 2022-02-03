import { ReactNode } from 'react';
import Link from 'next/link';

import styles from "./link-block.module.scss";
import container from "../assets/styles/Container.module.scss"
import typo from  '../assets/styles/Typo.module.scss';

export const LinkBlock = ({ link, children }: { link: string, children: ReactNode}) => {
    return (
        <div className={ styles.wrap }>
            <div className={ styles.heading }>
                <Link href={ encodeURI(link) }>
                    <div>
                        { children }
                    </div>
                </Link>
            </div>
        </div>
    )
}