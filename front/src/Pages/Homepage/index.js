import React,{Component} from 'react';
import styles from './styles.module.scss';
import searchIcon from './searchIcon.svg';
import cxk from './cxk.jpg'
import ycy from '../Idol/ycy.png'

class SearchBar extends  Component {
    render() {
        return (
            <div className={styles.searchBar}>
                <div className={styles.searchIcon}>
                    <img src={searchIcon} alt={"search icon"}/>
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
                <h1 className={styles.homepage}>FFFFFIRE</h1>
                <SearchBar />
            </div>

        );
    }
}

class IdolWrapper extends Component {
    render(){
        return (
            <div className={styles.idolArea}>
                <Idol img={cxk} name={"Cai Xukun"}/>
                <Idol img={ycy} name={"Yang Chaoyue"} />
                <Idol img={ycy} name={"Yang Chaoyue"} />
            </div>
        )
    }
}

class Idol extends Component {
    render(){
        return (
            <div className={styles.idol}>
                <img className={styles.avatar} src={this.props.img} alt={"idol avatar"} />
                <p className={styles.name}>{this.props.name}</p>
            </div>
        )
    }
}

export default class Homepage extends Component {
    render(){
        return (
            <div style={{minHeight: '100vh',width:'100%',overflowY:'hidden'}

            }>
                <Search />
                <IdolWrapper />
            </div>
        )
    }
}