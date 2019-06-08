import React, {Component} from 'react';
import styles from './styles.module.scss';
import ycy from './ycy.png';
import menuIcon from './menu.png'
import Stat from './Stat'

class Navigation extends Component {
    render() {
        return (
            <div className={styles.navigation}>
                <NavItemArea/>
                <div className={styles.menu}>
                    <img src={menuIcon} alt={"menu icon"}/>
                </div>
            </div>
        )
    }
}

class NavItemArea extends Component {
    render() {
        return (
            <div className={styles.navigationItemArea}>
                {['实时数据', '最近发博', '应援活动'].map(text => {
                        return (
                            <div className={styles.navigationItem}>
                                <li>{text}</li>
                                <div className={styles.shadow}/>
                            </div>
                        )

                    }
                )}
            </div>
        )
    }
}

class IdolBanner extends Component {
    render() {
        return (
            <div className={styles.idolBanner}>
                <div className={styles.idolName}>
                    <h1>Yang<br />ChaoYue</h1>
                    <h1 className={styles.idolNameShadow}>Yang<br />ChaoYue</h1>
                </div>
                <div className={styles.voteButton}>
                    <button>Vote For Her</button>
                    <div className={styles.buttonShadow} />
                </div>
                <div className={styles.idolImage}>
                    <div className={styles.imgWrapper}>
                        <img src={ycy} alt={"idol pic"}/>
                    </div>
                </div>
            </div>
        )
}
}

export default class Idol extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                {/*<Navigation/>*/}
                {/*<IdolBanner/>*/}
                <Stat />
            </div>
        )
    }
}