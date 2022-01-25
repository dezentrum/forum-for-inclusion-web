import hero from "./hero.module.scss";
import container from "../assets/styles/Container.module.scss"
import typo from  '../assets/styles/Typo.module.scss';

export const Hero = () => {
    return (
        <div className={hero.container}>
            <div className={hero.inner}>
                <div className={container.pageContainer}>
                    <h1 className={typo.headingBig}>Die Schweiz demokratisieren</h1>
                    <p className={hero.text}>Die Schweiz ist sehr stolz auf ihre direkte Demokratie. Doch 37% der Bewohner:innen sind von demokratischen Wahlen ausgeschlossen.</p>
                    <div className={hero.statsWrap}>
                        <div className={hero.stats}>
                            <div className={hero.statsIncluded}>
                                <div className={hero.statsNumber}>63%</div>
                                <div className={hero.statsLabel}>Stimmberechtigte</div>
                            </div>
                            <div className={hero.statsExcluded}>
                                <div className={hero.statsNumber}>37%</div>
                                <div className={hero.statsLabel}>Kein Stimmrecht</div>
                            </div>
                        </div>
                        <a className={hero.statsSource} href="https://www.bfs.admin.ch/">
                            <span className={typo.small}>
                                BFS, 2021
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}