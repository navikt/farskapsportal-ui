import React from 'react';
import Banner from './components/banner/Banner';
import Frontpage from './pages/frontpage/Frontpage';
import './App.less';

function App() {
    return (
        <div className="App">
            <Banner />
            <Frontpage />
        </div>
    );
}

export default App;
