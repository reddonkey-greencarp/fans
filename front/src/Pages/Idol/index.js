import Slider from "react-slick";
import React, {PureComponent, Component} from 'react';
import styles from './styles.module.scss';
import frStyles from '../Fundraising/styles.module.scss'
import 'slick-carousel/slick/slick-theme.scss';
import 'slick-carousel/slick/slick.scss';

import ycy from './ycy.png';
import menuIcon from './menu.png';
import weiboLike from './weibo_like.png';
import weiboRwd from './weibo_reward.png';
import weiboCmt from './weibo_cmt.png';

import Stat from './Stat'

const starPost = require('../../api/weibo/starPost');

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

class Header extends PureComponent {
    render() {
        return (
            <div className={frStyles.header}>
                <div className={frStyles.title}>最近发博</div>
            </div>
        );
    }
}

class IdolBanner extends Component {
    render() {
        return (
            <div className={styles.idolBanner}>
                <div className={styles.idolName}>
                    <h1>Yang<br/>ChaoYue</h1>
                    <h1 className={styles.idolNameShadow}>Yang<br/>ChaoYue</h1>
                </div>
                <div className={styles.voteButton}>
                    <button>Vote For Her</button>
                    <div className={styles.buttonShadow}/>
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

class IdolWeibo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }
    }

    componentDidMount() {
        starPost().then(data => {
            this.setState({data})
            console.log(this.state.data)
        })
    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            className: styles.idolWeibo,
            centerMode: true,
            centerPadding: "220px",
            slidesToShow: 1,
            speed: 500,
            arrows: false,
            focusOnSelect: true,
            slidesToScroll: 1
        };
        return (
            <div className={styles.idolWeiboWrapper}>

                <div style={{position: 'relative', margin: '5% 15% 2%'}}>
                    <div style={{position: 'relative', zIndex: 5}}>
                        <Header/></div>
                    <hr className={styles.line}/>
                </div>


                <Slider ref={c => (this.slider = c)} {...settings}>
                    {
                        this.state.data && this.state.data.items.map((v, index) => <div key={{index}}>
                            <div className={styles.card}>
                                <div className={styles.wrapper}>
                                    <div className={styles.content}>
                                        {v.title}
                                        {/*这个数组会渲染两次，如何在第二次渲染时插入数据？？*/}
                                    </div>
                                    <div className={styles.avatar}>
                                        <img src={this.state.data.image} alt={'avatar'}/>
                                    </div>
                                </div>
                                <div className={styles.cardFooter}>
                                    <div className={styles.func}>
                                        <img src={weiboLike}/>
                                        <p>{v.likes}</p>
                                    </div>
                                    <div className={styles.func}>
                                        <img src={weiboRwd}/>
                                        <p>22</p>
                                    </div>
                                    <div className={styles.func}>
                                        <img src={weiboCmt}/>
                                        <p>{v.comments}</p>
                                    </div>
                                </div>
                            </div>
                        </div>)

                    }
                </Slider>
            </div>
        );
    }
}

export default class Idol extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                {/*<Navigation/>*/}
                {/*<IdolBanner/>*/}
                <IdolWeibo/>
                {/*<Stat />*/}
            </div>
        )
    }
}