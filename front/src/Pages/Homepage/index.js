import React,{Component} from 'react';
import styles from './styles.module.scss';
import searchIcon from './searchIcon.svg';
import cxk from './cxk.png'
import ycy from '../Idol/ycy.png'
import wyf from './wyf.png'
import ycyround from '../Idol/ycy-round.png';
import logo from './logo.png'


class SearchBar extends  Component {
    render() {
        return (
            <div className={styles.searchBar}>
                <div onClick={()=>this.props.fn()}
                    className={styles.searchIcon}>
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
                {/*<h2 className={styles.homepage}>爱豆火拼拼</h2>*/}
                <img className={styles.homepage} src={logo} />
                <br />
                <SearchBar fn={()=>this.props.fn()}/>
            </div>
        );
    }
}

class IdolWrapper extends Component {
    render(){
        return (
            <div className={styles.idolArea}>
                <Idol img={ycyround} name={"Yang Chaoyue"} />
                <Idol img={cxk} name={"Cai Xukun"}/>
                <Idol img={wyf} name={"Wu Yifan"} />
            </div>
        )
    }
}

class Idol extends Component {
    render(){
        return (
            <div className={styles.idol}>
                <img  className={styles.avatar} src={this.props.img} alt={"idol avatar"} />
                <div className={styles.avatarStroke}/>
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
                <Search fn={()=>this.props.fn()} />
                <IdolWrapper />
            </div>
        )
    }
}