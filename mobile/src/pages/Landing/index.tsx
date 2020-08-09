import React, { useState, useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

import api from '../../services/api'

import landingImg from '../../assets/images/landing.png'
import studyIcon from '../../assets/images/icons/study.png'
import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import heartIcon from '../../assets/images/icons/heart.png'

import styles from './styles'

function Landing() {
    const { navigate } = useNavigation()

    const [totalConnections, setTotalConnections] = useState(0)

    useEffect(() => {
        api.get('/connections')
            .then(res => {
                const { total } = res.data
                
                setTotalConnections(total)
            })
    }, [])
    
    function navigateToSearchDoctors() {
        navigate('SearchDoctors')
    }

    function navigateToAppointmentsPage() {
        navigate('GiveAppointments')
    }

    return (
        <View style={styles.container}>
            <Image source={landingImg} style={styles.banner} />

            <Text style={styles.title}>
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold}>O que deseja fazer?</Text>
            </Text>

            <View style={styles.buttonsContainer}>
                <RectButton 
                    onPress={navigateToSearchDoctors}
                    style={[styles.button, styles.buttonPrimary]}
                >
                    <Image source={studyIcon} />
                    <Text style={styles.buttonText}>Agendar Consulta</Text>
                </RectButton>
                <RectButton 
                    onPress={navigateToAppointmentsPage}
                    style={[styles.button, styles.buttonSecondary]}
                >
                    <Image source={giveClassesIcon} />
                    <Text style={styles.buttonText}>Atender Pacientes</Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                Total de {totalConnections} conexões realizadas {' '}
                <Image source={heartIcon} />
            </Text>
        </View>
    )
}

export default Landing