import React, { PureComponent } from 'react';
import styles from './styles.module.scss';
import button from './button.png';

export default class Live extends PureComponent {
    state = {
        showing: 0
    };

    setShowing = (index) => () => {
        this.setState({
            showing: index
        })
    };

    render() {
        const src = ['https://www.weibo.com/u/1686876834', 'https://www.weibo.com/u/6616805064', 'https://weibo.com/u/6527800053'];
        const { showing } = this.state;
        return (
            <div className={styles.wrapper}>
                <iframe className={styles.frame} src={src[showing]} />
                <div className={styles.buttonContainer}>
                    <div className={styles.button} onClick={this.setShowing(0)}>
                        <img src={button} />
                        <p>大粉微博</p>
                    </div>
                    <div className={styles.button} onClick={this.setShowing(1)}>
                        <img src={button} />
                        <p>实时反黑</p>
                    </div>
                    <div className={styles.button} onClick={this.setShowing(2)}>
                        <img src={button} />
                        <p>数据汇总</p>
                    </div>
                </div>
            </div>
        );
    }
}
