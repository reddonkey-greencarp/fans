import React, { Component } from 'react'
import styles from './styles.module.scss'
import backImg from './ycy-text.png'
import titleImg from './title.png'




export default class Support extends Component {
  constructor(props) {
    super(props)
    // this.handleScroll = this.handleScroll.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      hitMask: 1,
      fromBottom: 0,
      haveMoney: 2333,
      gg: 1,
    }
  }
  componentDidMount() {
    console.log(this.state.gg)
    window.addEventListener('scroll', this.handleScroll);
    this.refs.main.addEventListener('click', this.handleClick);
    // console.log(this.refs.main.scrollTop)
  }
  handleClick(e) {
    this.setState({
      gg: 0
    })
    if (this.state.gg === 0 && this.state.hitMask) {
      this.setState({
        hitMask: 0,
        gg: 1
      })
      let intervelId = setInterval(() => {
        let older = this.refs.mask.getBoundingClientRect().width
        let newWidth = older - 30
        this.refs.mask.style.width = newWidth + "px"
        if (newWidth < 0) this.refs.mask.style.width = 0

        // console.log(this.refs.mask.style.width)
        if (newWidth < 0) {
          // console.log("done")
          clearInterval(intervelId)
          this.setState({
            fromBottom: 1,
          })
        }
      }, 15)
    }
  }
  // handleScroll(e) {
  //   if (this.state.gg == 0 && this.state.hitMask) {
  //     // console.log("hit")
  //     this.setState({
  //       hitMask: 0
  //     })
  //     let intervelId = setInterval(() => {
  //       let older = this.refs.mask.getBoundingClientRect().width
  //       let newWidth = older - 30
  //       this.refs.mask.style.width = newWidth + "px"
  //       if (newWidth < 0) this.refs.mask.style.width = 0

  //       console.log(this.refs.mask.style.width)
  //       if (newWidth < 0) {
  //         // console.log("done")
  //         clearInterval(intervelId)
  //         this.setState({
  //           fromBottom: 1,
  //         })
  //       }
  //     }, 15)
  //   }
  // }
  render() {
    return (
      <div>
        {/* ggs */}
        <div className={styles.wrapper} ref="main">
          <div className={styles.mask} ref="mask">
          </div>
          <div >
            <img className={this.state.fromBottom ? styles.fromBottom : styles.ycyText} src={backImg} alt="" />
          </div>
          <div >
            <img className={this.state.fromBottom ? styles.fromTop : styles.titleText} src={titleImg} alt="" />
          </div>
          <div className={this.state.fromBottom ? styles.fromRight : styles.btnWrapper}>
            <div className={styles.innerText}>
              <p>已经筹集{this.state.haveMoney}元</p>
              <p>还需{20000 - this.state.haveMoney}元</p>
              <p>此次集资用于剧组应援物料购买</p>
            </div>
            <div className={styles.btnInner}>
              <div className={styles.frontBorder}>
                <p>
                  Support Her
                </p>
              </div>
              <div className={styles.backBorder}>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}