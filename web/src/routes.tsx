import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import DoctorList from './pages/DoctorList'
import DoctorForm from './pages/DoctorForm'

function Routes() {
    return (
        <BrowserRouter>
            <Route  path="/" exact component={Landing} />
            <Route  path="/search-doctors" component={DoctorList} />
            <Route  path="/give-appointment" component={DoctorForm} />
        </BrowserRouter>
    )
}

export default Routes