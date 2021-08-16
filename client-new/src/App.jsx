import react from 'react';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import DisplayEverything from './routes/DisplayEverything';
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';

const App = () => {
    return <div>
        <Router>
            <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/services/:serviceId/update' component={UpdatePage}/>
            <Route exact path='/services/:serviceId' component={DisplayEverything}/>
            </Switch>
        </Router>
    </div>;
};

export default App;