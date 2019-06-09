import React, {Component} from 'react';
import 'normalize.css'
import logo from './logo.svg';
import './App.css';
import Homepage from './Pages/Homepage'
import Idol from './Pages/Idol'
import Support from './Pages/Support'
import Offline from './Pages/Idol/offline'

class App extends Component {
    render() {

        return (

                <div className="App">
                    <Homepage/>
                    <Idol/>
                    {/*<Offline/>*/}
                    {/*< Support/>*/}

                </div>
        );
    }
}

export default App;
