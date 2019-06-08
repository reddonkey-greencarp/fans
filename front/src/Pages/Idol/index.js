import React, {Component} from 'react';
import Slider from "react-slick";
import styles from './styles.module.scss';
import ycy from './ycy.png';
import menuIcon from './menu.png';
import 'slick-carousel/slick/slick-theme.scss';
import 'slick-carousel/slick/slick.scss';
import weiboLike from './weibo_like.png';
import weiboRwd from './weibo_reward.png';
import weiboCmt from './weibo_cmt.png';
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

class IdolWeibo extends Component {
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
            <Slider ref={c => (this.slider = c)} {...settings}>
                {
                    Array(5).fill(1).map(v=><div>
                        <div className={styles.card}>
                            <div className={styles.wrapper}>
                            <div className={styles.content}>
                                谢谢大家对我的关心，但是我爸爸是个普通人，无关的人请不要接触我爸爸的生活，他是个普通人，我家也不是景点，谢谢🙏你们了拜托了。❤️ ​​
                            </div>
                            </div>
                            <div className={styles.cardFooter}>
                                <div className={styles.func}>
                                    <img src={weiboLike} />
                                    <p>22</p>
                                </div>
                                <div className={styles.func}>
                                    <img src={weiboRwd} />
                                    <p>22</p>
                                </div>
                                <div className={styles.func}>
                                    <img src={weiboCmt} />
                                    <p>22</p>
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
                <Navigation />
                {/*<IdolBanner/>*/}
                <IdolWeibo />
                {/*<Stat />*/}
            </div>
        )
    }
}