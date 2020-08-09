import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Landing from '../pages/Landing'
import GiveAppointments from '../pages/GiveAppointments'
import SearchDoctorsTabs from './SearchDoctorsTabs'

const { Navigator, Screen } = createStackNavigator()

function AppStack() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="Landing" component={Landing} />
                <Screen name="GiveAppointments" component={GiveAppointments} />            
                <Screen name="SearchDoctors" component={SearchDoctorsTabs} />
            </Navigator>
        </NavigationContainer>
    )
}

export default AppStack