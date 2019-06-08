import React,{Component} from 'react';
import styles from './styles.module.scss';
import searchIcon from './searchIcon.svg';
import cxk from './cxk.jpg'

class SearchBar extends  Component {
    render() {
        return (
            <div className={styles.searchBar}>
                <div className={styles.searchIcon}>
                    <img src={searchIcon} />
                </div>
                <div className={styles.searchText}>
                    <input placeholder={"你关注的爱豆"} />
                </div>
            </div>
        )
    }
}

class Search extends Component {
    render(){
        return (
            <div className={styles.wrapper}>
                <h1>FFFFFIRE</h1>
                <SearchBar />
            </div>

        );
    }
}

class IdolWrapper extends Component {
    render(){
        return (
            <div className={styles.idolArea}>
                <Idol />
                <Idol />
                <Idol />
            </div>
        )
    }
}

class Idol extends Component {
    render(){
        return (
            <div className={styles.idol}>
                <img className={styles.avatar} src={cxk} />
                <p className={styles.name}>Cai Xukun</p>
            </div>
        )
    }
}

export default class Homepage extends Component {
    render(){
        return (
            <div>
                <Search />
                <IdolWrapper />
            </div>
        )
    }
}