import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import PageHeader from '../../components/PageHeader'
import DoctorItem, { Doctor } from '../../components/DoctorItem'

import styles from './styles'

function Favorites() {
    const [favorites, setFavorites] = useState([])

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(res => {
            if (res) {
                const favoritedDoctors = JSON.parse(res)

                setFavorites(favoritedDoctors)
            }
        })
    }

    useFocusEffect(() => {
        loadFavorites()
    })

    return (
        <View style={styles.container}>
            <PageHeader title="Meus médicos favoritos" />

            <ScrollView
                style={styles.doctorList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {favorites.map((doctor: Doctor) => {
                    return (
                        <DoctorItem
                            key={doctor.id}
                            doctor={doctor}
                            favorited
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default Favorites