import React from 'react';

import Land4glory from './pages/Land4glory'
import Bad2Good from './pages/Bad2Good'
import Answer from './pages/Answer'
import Abcdefg from './pages/Abcdefg'
import {Switch,Route} from 'react-router-dom'
 
const Router = () => (
    <Switch>
        <Route exact path='/' component={Bad2Good}/>
        {/* <Route path='/land-of-lory' component={Land4glory}/> */}
        <Route path='/bad-to-good' component={Bad2Good}/>
        <Route path='/best-answer' component={Answer}/>
        <Route path='/abcdefg' component={Abcdefg}/>
    </Switch>
)
 
export default Router;