import React, {Component} from 'react';
import styles from './styles.module.scss';

class Navigation extends Component {
    render() {
        return (
            <div className={styles.navigation}>
                <NavItemArea/>
                <div className={styles.menu}>
                    <p>三</p>
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
            <div className={styles.idolBannner}>
                <h1 className={styles.idolName}>Yang Chaoyue</h1>
                <div className={styles.voteButton}>
                    <button>Vote For Her</button>
                    <div className={styles.buttonShadow} />
                </div>
                <div className={styles.idolImage}>
                    <img src={''}/>
                </div>
            </div>
        )

}

export default class Idol extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <Navigation/>
                <IdolBanner/>
            </div>
        )
    }
}