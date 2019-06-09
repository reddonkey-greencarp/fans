import React, { Component } from 'react'
import styles from './olStyles.module.scss'
import planeImg from './plane.png'
import concertImg from './concert.png'
import magazineImg from './magazine.png'

export default class Offline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayFrom: 0,
      hitMask: 1
    }
    this.handleScroll = this.handleScroll.bind(this)
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    if (this.refs.main.offsetTop === 0 && this.state.hitMask) {
      this.setState({
        hitMask: 0,
        displayFrom: 1,
      })
    }
  }

  handleScroll(e) {
    console.log("gg" + this.refs.main.offsetTop, this.refs.main.clientTop, this.refs.main.scrollTop)
    if (this.refs.main.scrollTop === 0 && this.state.hitMask) {
      console.log(this.refs.main.scrollTop)
      console.log(this.refs.main.screenTop)
      this.setState({
        hitMask: 0,
        displayFrom: 1,
      })
    }
  }
  render() {
    return (
      <div className={styles.wrapper} ref="main">
        {/*<Navigation />*/}
        <div className={styles.imgWrapper}>
          <img src={planeImg} className={this.state.displayFrom ? styles.fromBottom1 : styles.imageStyle} alt="" />
          <img src={concertImg} className={this.state.displayFrom ? styles.fromBottom2 : styles.imageStyle} alt="" />
          <img src={magazineImg} className={this.state.displayFrom ? styles.fromBottom3 : styles.imageStyle} alt="" />
        </div>
      </div>
    )
  }
}