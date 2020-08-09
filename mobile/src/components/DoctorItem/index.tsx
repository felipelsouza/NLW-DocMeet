import React, { useState } from 'react'
import { View, Image, Text, Linking } from "react-native";
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'

import api from '../../services/api';

import styles from './styles'

export interface Doctor {
    avatar: string
    bio: string
    cost: number
    crm: string
    id: number
    name: string
    specialization: string
    whatsapp: string
}

interface DoctorItemProps {
    doctor: Doctor,
    favorited: boolean
}

const DoctorItem: React.FC<DoctorItemProps> = ({ doctor, favorited }) => {
    const [isFavorited, setIsFavorited] = useState(favorited)

    function linkToWhatsapp() {
        api.post('connections', {
            user_id: doctor.id
        })

        Linking.openURL(`whatsapp://send?phone=${doctor.whatsapp}`)
    }

    async function handleToggleFavorite() {
        const favorites = await AsyncStorage.getItem('favorites')
        
        let favoritesArray = []

        if (favorites) {
            favoritesArray = JSON.parse(favorites)
        }

        if (isFavorited) {
            const FavoriteIndex = favoritesArray.findIndex((doctorItem: Doctor) => {
                return doctorItem.id === doctor.id
            })
            
            favoritesArray.splice(FavoriteIndex, 1)

            setIsFavorited(false)
        } else {
            favoritesArray.push(doctor)

            setIsFavorited(true)
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: doctor.avatar }}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{doctor.name}</Text>
                    <Text style={styles.specialization}>{doctor.specialization}</Text>
                </View>
            </View>

            <Text style={styles.bio}>{doctor.bio}</Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Consulta {'   '}
                    <Text style={styles.priceValue}>R$ {doctor.cost}</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton 
                        onPress={handleToggleFavorite}
                        style={[
                            styles.favoriteButton, 
                            isFavorited ? styles.favorited : {}
                        ]}
                    >
                        { isFavorited 
                            ? <Image source={unfavoriteIcon} /> 
                            : <Image source={heartOutlineIcon}/> 
                        }
                        {/* <Image source={heartOutlineIcon}/> */}
                    </RectButton>

                    <RectButton onPress={linkToWhatsapp} style={styles.contactButton}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

export default DoctorItem