import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Offer from './Offer'
import registerServiceWorker from './registerServiceWorker'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Root = () => (
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/offer/:type" component={Offer} />
        </div>
    </Router>
)

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
