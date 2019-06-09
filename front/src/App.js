import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Homepage from './Pages/Homepage'
import Idol from './Pages/Idol'
import Support from './Pages/Support'
import Offline from './Pages/offline'
import Slider from "react-slick";
class App extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>

        <div className="App" >
          {/* <Homepage /> */}
          {/* <Idol /> */}
          <Offline />
          < Support />

        </div >
      </Slider>
    );
  }
}
export default App;
