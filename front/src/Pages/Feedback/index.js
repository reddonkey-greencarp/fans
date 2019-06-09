import React, { PureComponent } from 'react';
import styles from './styles.module.scss';
import { HomePageButton } from '../Fundraising';

class Header extends PureComponent {

    render() {
        return <HomePageButton />;
    }
}

class Circles extends PureComponent {

    state = {
        active: -1
    };

    setActive = (index) => () => {
        this.setState({
            active: index
        })
    };

    render() {
        const contents = [
            <>杨超越<br />全球粉丝团后援会<br />生日应援</>,
            <>大家记得doki为超越生日<br />应援打投哦！</>,
            <>初心未变<br />向杨而生<br />超越一切</>,
            <>期待杨超越<br />等待美图吧<br />每天都美出新高度！！！</>
        ];
        const { active } = this.state;
        return (
            <div>
                <div className={styles.circle1} onMouseEnter={this.setActive(0)} onMouseLeave={this.setActive(-1)}>
                    {active === 0 ? null : contents[0]}
                </div>
                <div className={styles.circle2} onMouseEnter={this.setActive(1)} onMouseLeave={this.setActive(-1)}>
                    {active === 1 ? null : contents[1]}
                </div>
                <div className={styles.circle3} onMouseEnter={this.setActive(2)} onMouseLeave={this.setActive(-1)}>
                    {active === 2 ? null : contents[2]}
                </div>
                <div className={styles.circle4} onMouseEnter={this.setActive(3)} onMouseLeave={this.setActive(-1)}>
                    {active === 3 ? null : contents[3]}
                </div>
            </div>
        );
    }
}

class MessageBox extends PureComponent {
    render() {
        return (
            <div className={styles.messageBox}>
                <p className={styles.message}>杨超越在独角兽应援站旁边发应援物~</p>
            </div>
        );
    }
}

export default class Feedback extends PureComponent {
    render() {
        return (
            <div className={styles.wrapper}>
                <Header />
                <MessageBox />
                <Circles />
            </div>
        )
    }
}
