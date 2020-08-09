import React from 'react'
import { View, ImageBackground, Text } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import giveClassesBgImage from '../../assets/images/give-classes-background.png'

import styles from './styles'

function GiveAppointments() {
    const { goBack } = useNavigation()

    function navigateGoBack() {
        goBack()
    }

    return (
        <View style={styles.container}>
            <ImageBackground 
                resizeMode="contain" 
                source={giveClassesBgImage} 
                style={styles.content}
            >
                <Text style={styles.title}>Conecte-se com novos pacientes!</Text>
                <Text style={styles.description}>
                    Para começar, você precisa se cadastrar como médico na nossa plataforma web.
                </Text>
            </ImageBackground>

            <RectButton 
                style={styles.okButton}
                onPress={navigateGoBack}
            >
                <Text style={styles.okButtonText}>Voltar ao Menu</Text>
            </RectButton>
        </View>    
    )
}

export default GiveAppointments
