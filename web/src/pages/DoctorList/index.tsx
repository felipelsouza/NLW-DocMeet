import React, { useState, FormEvent } from 'react'

import PageHeader from '../../components/PageHeader'
import DoctorItem, { Doctor } from '../../components/DoctorItem'
import Input from '../../components/Input'
import Select from '../../components/Select'

import api from '../../services/api'

import './styles.css'

function DoctorList() {
    const [doctors, setDoctors] = useState([])

    const [specialization, setSpecialization] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    async function SearchDoctors(e: FormEvent) {
        e.preventDefault()

        const response = await api.get('/appointments', {
            params: {
                specialization,
                week_day,
                time
            }
        })

        setDoctors(response.data)
    }

    return (
        <div id="page-doctor-list" className="container">
            <PageHeader title="Estes são os médicos disponíveis:">
                <form id="search-doctors" onSubmit={SearchDoctors}>
                <Select 
                        name="specialization" 
                        label="Especialização"
                        value={specialization}
                        onChange={(e) => { setSpecialization(e.target.value) }}
                        options={[
                            { value: 'Cardiologista', label: 'Cardiologista' },
                            { value: 'Cirurgião', label: 'Cirurgião' },
                            { value: 'Dermatologista', label: 'Dermatologista' },
                            { value: 'Geriatra', label: 'Geriatra' },
                            { value: 'Ginecologista', label: 'Ginecologista' },
                            { value: 'Mastologista', label: 'Mastologista' },
                            { value: 'Oftamologista', label: 'Oftamologista' },
                            { value: 'Oncologista', label: 'Oncologista' },
                            { value: 'Otorrino', label: 'Otorrino' },
                            { value: 'Pediatra', label: 'Pediatra'},
                            { value: 'Psiquiatra', label: 'Psiquiatra' },
                            { value: 'Urologista', label: 'Urologista' },
                        ]}
                    />
                    <Select 
                        name="week_day" 
                        label="Dia da semana"
                        value={week_day}
                        onChange={(e) => { setWeekDay(e.target.value) }}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sábado' },
                        ]}
                    />
                    <Input 
                        type="time"    
                        name="time"     
                        label="Hora"
                        value={time}
                        onChange={(e) => { setTime(e.target.value) }}
                    />

                    <button type="submit" onSubmit={SearchDoctors}>
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {doctors.map((doctor: Doctor) => {
                    return <DoctorItem key={doctor.id} doctor={doctor} /> 
                })}
            </main>
        </div>
    )
}

export default DoctorList