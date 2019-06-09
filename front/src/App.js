import React, {Component} from 'react';
import 'normalize.css'
import logo from './logo.svg';
import './App.css';
import Homepage from './Pages/Homepage'
import Idol from './Pages/Idol'
import Support from './Pages/Support'
import Live from './Pages/Live'
import Fundraising from './Pages/Fundraising'
import Feedback from './Pages/Feedback'


class App extends Component {
    state = {isHome: true};

    handleClick() {
        this.setState({isHome: false})
    }

    render() {
        return (
            <div className="App">
                {this.state.isHome
                    ? <Homepage fn={()=>this.handleClick()}/>
                    : <div>
                        <Idol/>
                        {/*<Offline/>*/}
                        {/*< Support/>*/}
                        <div className={"wrapper"}><Live/></div>
                        <div className={"wrapper"}><Feedback/></div>
                        <div className={"wrapper"}><Fundraising/></div>
                    </div>
                }
            </div>)
    }
}
export default App;
