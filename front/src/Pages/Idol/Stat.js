import React, {Component} from 'react';
import styles from './styles.module.scss';
import Mock from 'mockjs';

class StatNum extends Component{
    render() {
        return (
            <div className={styles.statArea}>
                <h3 className={styles.statNum}>1022,0000</h3>
                <h3 className={styles.statTitle}>Number of fans</h3>
            </div>
        )
    }
}

class StatScrollItem extends Component {
    render(){
        console.log(this.props);
        let distance = (this.props.index - this.props.focus);
        return (
            <div
                style={{
                    transform: `translateX(${-Math.abs(distance*20)}px) rotateX(${distance*15}deg) skewX(${-distance*5}deg)`,
                }}
                onClick={()=>this.props.handleClick(this.props.index)}
                className={`${styles.statScrollItem} ${this.props.active ? styles.active: ''}`}>
                    <h1>
                        {!this.props.active && <small>{this.props.index || 0} </small>}
                        {this.props.text && this.props.active
                            ?  `${this.props.text} ${this.props.text} ${this.props.text} ${this.props.text} `
                            : this.props.text}
                    </h1>
            </div>
        )
    }
}

class StatScroll extends Component{
    constructor(props){
        super(props);
    }
    render() {
        console.log(this.props.handleClick);
        return (
            <div className={styles.statArea}>
                {this.props.contents.map(
                        (content)=>
                            <StatScrollItem
                                index={content.id}
                                active={content.id===this.props.focus}
                                focus={this.props.focus}
                                text={content.text}
                                handleClick={this.props.handleClick}
                            />
                        )}
            </div>
        )
    }
}

export default class Stat extends Component {
    constructor(props){
        super(props);
        const contents = Mock.mock({
            'data|5': [{
                'id|+1': 0,
                'text': /[A-Z][a-z]{3,5} [A-Z][a-z]{5,10}/,
                'active': false,
                'title': 'Number of fans',
                'value' : parseInt(Math.random()*10000000)
            }]
        });
        this.state = {
            focus:3,
            contents: contents.data,
        };

    }
    handleClick(focus){
        this.setState({focus})
    }
    render() {

        this.state.contents[this.state.focus].active=true;

        return (
            <div className={styles.statWrapper}>

                <div className={styles.cardWrapper}>
                    <div className={styles.cardBackground}>
                        <div className={styles.cardIcon} />
                        <StatNum />
                    </div>
                </div>

                <div className={styles.dataWrapper} style={{
                    transform: `translate3d(0px,${-(this.state.focus-1)*25}%,0px)`
                }}>
                    <StatScroll
                        focus={this.state.focus}
                        contents={this.state.contents}
                        handleClick={(focus)=>{this.handleClick(focus)}}/>
                </div>

            </div>
        )
    }
}