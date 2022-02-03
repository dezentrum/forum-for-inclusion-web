import style from "./page-heading.module.scss";
import container from "../assets/styles/Container.module.scss"
import typo from  '../assets/styles/Typo.module.scss';

export const PageHeading =  ({ title }: { title: String }) => {
    return (
        <div className={style.container}>
            <h1 className={typo.headingBig}>{title }</h1>
        </div>
    )
}