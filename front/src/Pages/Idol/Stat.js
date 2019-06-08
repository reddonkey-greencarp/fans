import React, {Component} from 'react';
import styles from './styles.module.scss';
import Mock from 'mockjs';

class StatNum extends Component{
    render() {
        let {focus} = this.props;
        let data = this.props.contents[focus];
        return (
            <div className={styles.statArea}>
                <h3 className={styles.statNum}>{data.value}</h3>
                <h3 className={styles.statTitle}>{data.title}</h3>
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
                    transform: `translateX(${-Math.abs(distance*40)}px) rotateX(${distance*15}deg) skewX(${-distance*5}deg)`,
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

class Content {
    /**
     *
     * @param id
     * @param text
     * @param type
     * @param active
     * @param title
     * @param value
     */
    constructor(id=0,text='text here',type='text',value,active=false,title='Number of fans',){
        this.id = id;
        this.text = text;
        this.type = type;
        this.active=active;
        this.title=title;
        this.value=parseInt(Math.random()*10000000);
    }
}

export default class Stat extends Component {
    constructor(props){
        super(props);
        // const contents = Mock.mock({
        //     'data|5': [{
        //         'id|+1': 0,
        //         'text': /[A-Z][a-z]{3,5} [A-Z][a-z]{5,10}/,
        //         'active': false,
        //         'title': 'Number of fans',
        //         'value|100000-10000000' : 1
        //     }]
        // });
        const contents = [
            new Content(0,'Weibo Followers'),
            new Content(1,'Zhihu Followers','ranking',['']),
            new Content(2,'Chaohua Followers'),
            new Content(3,'Douban Followers'),
            new Content(4,'Tieba Followers'),
            new Content(5,'Twitter Followers'),
        ]
        this.state = {
            focus:3,
            contents
        };

    }
    handleClick(focus){
        this.setState({focus})
    }
    render() {
        let activeContent =this.state.contents[this.state.focus];
        activeContent.active=true;

        return (
            <div className={styles.statWrapper}>

                <div className={styles.cardWrapper}>
                    <div className={styles.cardBackground}>
                        {activeContent.type === 'text' &&
                        <div
                            style={{width:'100%',height:'100%'}}>
                            <div className={styles.cardIcon} />
                            <StatNum
                                focus={this.state.focus}
                                contents ={this.state.contents}
                            />
                        </div>}
                        {activeContent.type === 'ranking' &&
                        <div
                            style={{width:'100%',height:'100%'}}>
                            <div className={styles.cardIcon} />
                            <StatNum
                                focus={this.state.focus}
                                contents ={this.state.contents}
                            />
                        </div>}
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