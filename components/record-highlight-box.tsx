import Link from 'next/link';

import style from "./record-highlight-box.module.scss";
import container from "../assets/styles/Container.module.scss";
import typo from  '../assets/styles/Typo.module.scss';
import button from "../assets/styles/Button.module.scss"

export const RecordHighlightBox =  () => {
    return (
        <div className={style.wrap}>
            <div className={container.pageContainer}>
                <div className={style.inner}>
                    <div className={style.text}>
                        <p>Gehörtst du selber zu einer Gruppe von Menschen die von direkter politischer Partizipation ausgeschlossen sind? Dann nimm deine Eigene Meinung zu einer aktuellen nationalen Abstimmung auf.</p>
                    </div>
                    <div className={style.buttonWrap}>
                        <Link href="/voting-select">
                            <div className={button.record}><span>Aufnehmen</span></div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}