import React from 'react';
import Bad2Good from './pages/Bad2Good'
import Answer from './pages/Answer'
import {Switch,Route} from 'react-router-dom'
 
const Router = () => (
    <Switch>
        <Route exact path='/' component={Bad2Good}/>
        <Route exact path='/bad-to-good' component={Bad2Good}/>
        <Route path='/best-answer' component={Answer}/>
    </Switch>
)
 
export default Router;