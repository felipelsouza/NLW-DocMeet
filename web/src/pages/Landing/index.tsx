import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'

import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'

import api from '../../services/api'

import './styles.css'

function Landing() {
    const [totalConnections, setTotalConnections] = useState(0)

    useEffect(() => {
        api.get('/connections')
            .then(res => {
                const { total } = res.data
                
                setTotalConnections(total)
            })
    }, [])

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="DocMeet" />
                    <h2>Sua plataforma online para agendamento de consultas médicas</h2>
                </div>

                <img
                    src={landingImg}
                    alt="Plataforma de agendamento de consultas"
                    className="hero-image"
                />

                <div className="buttons-container">
                    <Link to="/search-doctors" className="search-doctors">
                        <img src={studyIcon} alt="Encontrar médicos" />
                        Encontrar Médicos
                    </Link>

                    <Link to="/give-appointment" className="give-appointment">
                        <img src={giveClassesIcon} alt="Atender Pacientes" />
                        Atender Pacientes
                    </Link>
                </div>
                <span className="total-connections">
                    Total de {totalConnections} conexões já realizadas
                    <img src={purpleHeartIcon} alt="Coração Roxo" />
                </span>

            </div>
        </div>
    )
}

export default Landing