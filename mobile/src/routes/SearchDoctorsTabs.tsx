import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import DoctorList from '../pages/DoctorList'
import Favorites from '../pages/Favorites'

const { Navigator, Screen } = createBottomTabNavigator()

function SearchDoctorsTabs() { 
    return(
        <Navigator
            tabBarOptions={{
                style: {
                    elevation: 0,
                    shadowOpacty: 0,
                    height: 64
                },
                tabStyle: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                iconStyle: {
                    flex: 0,
                    height: 20,
                    width:20
                },
                labelStyle: {
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 16, 
                },
                inactiveBackgroundColor: '#fafafc',
                activeBackgroundColor: '#ebebf5',
                inactiveTintColor: '#c1bccc',
                activeTintColor: '#32264d'

            }}
        >
            <Screen 
                name="DoctorList" 
                component={DoctorList} 
                options={{
                    tabBarLabel: 'Médicos',
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <Ionicons name="ios-medkit" size={size} color={focused ? '#8257e5' : color}/>
                        )
                    }
                }}
            />
            <Screen 
                name="Favorites" 
                component={Favorites} 
                options={{
                    tabBarLabel: 'Favoritos',
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <Ionicons name="ios-heart" size={size} color={focused ? '#8257e5' : color}/>
                        )
                    }
                }}
            />
        </Navigator>
    )
}

export default SearchDoctorsTabs