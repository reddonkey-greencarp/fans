import React, { PureComponent } from 'react';
import styles from './styles.module.scss';
import table from './table.png';
import ycy from './ycy.png';

class Navigation extends PureComponent {
    render() {
        const { month, isActive, setActive } = this.props;
        return <div className={isActive ? styles.monthActive : styles.month} onClick={setActive}>{`${month}月`}</div>
    }
}

class Header extends PureComponent {

    state = {
        active: 0
    };

    setActive = (index) => () => {
        this.setState({
            active: index
        })
    };

    render() {
        const months = [2, 3, 4, 5, 6, 7];
        const active = this.state.active;
        return (
            <div className={styles.header}>
                <div className={styles.title}>集资去向</div>
                <div className={styles.navigation}>
                    {months.map((month, index) => <Navigation month={month} key={index} isActive={active === index} setActive={this.setActive(index)} />)}
                </div>
            </div>
        );
    }
}

class Table extends PureComponent {
    render() {
        return (
            <div className={styles.table}>
                <img src={table} className={styles.image} />
            </div>
        );
    }
}

class YCY extends PureComponent {
    render() {
        return (
            <div>
                <img src={ycy} className={styles.ycy} />
                <div className={styles.yShadow}>Yang</div>
                <div className={styles.cyShadow}>ChaoYue</div>
            </div>
        );
    }
}

class HomePageButton extends PureComponent {
    render() {
        return (
            <div className={styles.homePage}>Home Page</div>
        )
    }
}

export default class Fundraising extends PureComponent {
    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.main}>
                    <HomePageButton />
                    <Header />
                    <Table />
                    <YCY />
                </div>
            </div>
        );
    }
}
