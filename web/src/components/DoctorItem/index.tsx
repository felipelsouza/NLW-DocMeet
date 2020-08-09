import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import api from '../../services/api'

import './styles.css'

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
    doctor: Doctor
}

const DoctorItem: React.FC<DoctorItemProps> = ({ doctor }) => {
    function createNewConnection() {
        api.post('/connections', {
            user_id: doctor.id
        })
    }
    
    return (
        <article className="doctor-item">
            <header>
                <img src={doctor.avatar} alt={doctor.name} />
                <div>
                    <strong>Dr(a). {doctor.name}</strong>
                    <span>{doctor.specialization}</span>
                </div>
            </header>
    
            <p>
                {doctor.bio}
            </p>
    
            <footer>
                <p>
                    Preço/Consulta
                    <strong>R$ {doctor.cost}</strong>
                </p>
                <a 
                    onClick={createNewConnection} 
                    href={`https://wa.me/${doctor.whatsapp}`} 
                    target="_blank"
                >
                    <img src={whatsappIcon} alt="Whatsapp" />
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default DoctorItem