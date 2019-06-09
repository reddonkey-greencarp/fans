import React, { PureComponent } from 'react';
import styles from './styles.module.scss';
import button from './button.png';

export default class Live extends PureComponent {
    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.buttonContainer}>
                    <div>
                        <img src={button} />
                        <p>大粉微博</p>
                    </div>
                    <div>
                        <img src={button} />
                        <p>实时反黑</p>
                    </div>
                    <div>
                        <img src={button} />
                        <p>数据汇总</p>
                    </div>
                </div>
            </div>
        );
    }
}
