import React, { useState } from 'react'
import {
    View,
    ScrollView,
    Text,
    TextInput
} from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import api from '../../services/api'

import PageHeader from '../../components/PageHeader'
import DoctorItem, { Doctor } from '../../components/DoctorItem'

import styles from './styles'

function DoctorList() {
    const [doctors, setDoctors] = useState([])
    const [favorites, setFavorites] = useState<number[]>([])
    
    const [isFiltersVisible, setIsFiltersVisible] = useState(false)

    const [specialization, setSpecialization] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(res => {
            if(res) {
                const favoritedDoctors = JSON.parse(res)
                const favoritedDoctorsIds = favoritedDoctors.map((doctor: Doctor) => {
                    return doctor.id
                })

                setFavorites(favoritedDoctorsIds)
            }
        })
    }

    useFocusEffect(() => {
        loadFavorites()
    })

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible)
    }

    async function handleFiltersSubmit() {
        loadFavorites()

        const response = await api.get('/appointments', {
            params: {
                specialization,
                week_day,
                time
            }
        })

        setIsFiltersVisible(false)
        setDoctors(response.data)
    }

    return (
        <View style={styles.container}>
            <PageHeader
                title="Médicos disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )}
            >
                {isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Especialidade</Text>
                        <TextInput
                            style={styles.input}
                            value={specialization}
                            onChangeText={text => setSpecialization(text)}
                            placeholder="Qual a especialidade?"
                            placeholderTextColor="#c1bccc"
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput
                                    style={styles.input}
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                    placeholder="Qual o dia?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    style={styles.input}
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholder="Qual o horário?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>
                        </View>

                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.doctorList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {doctors.map((doctor: Doctor) => {
                    return (
                        <DoctorItem 
                            key={doctor.id} 
                            doctor={doctor}
                            favorited={favorites.includes(doctor.id)}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default DoctorList