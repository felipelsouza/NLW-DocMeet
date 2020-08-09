import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/TextArea'
import Select from '../../components/Select'

import warningIcon from '../../assets/images/icons/warning.svg'

import api from '../../services/api'

import './styles.css'

function DoctorForm() {
    const history = useHistory()

    const [name, setName] = useState('')
    const [crm, setCrm] = useState('')
    const [avatar, setAvatar] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')

    const [specialization, setSpecialization] = useState('')
    const [cost, setCost] = useState('')


    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ])

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: '' }
        ])
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem
        })

        setScheduleItems(updateScheduleItems)
    }

    function handleCreateAppointment(e: FormEvent) {
        e.preventDefault()

        api.post('/appointments', {
            name,
            crm,
            avatar,
            whatsapp,
            bio,
            specialization,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!')
            
            history.push('/')
        }).catch(() => {
            alert('Erro no cadastro!')
        })
    }

    return (
        <div id="page-doctor-form" className="container">
            <PageHeader
                title="Que incrível que você quer atender novos pacientes!"
                description="O primeiro passo é preencher esse formuláriio de inscrição"
            />

            <main>
                <form onSubmit={handleCreateAppointment}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            name="name"
                            label="Nome Completo"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                        <Input
                            name="crm"
                            label="CRM"
                            value={crm}
                            onChange={(e) => { setCrm(e.target.value) }}
                        />
                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }}
                        />
                        <Input
                            name="whatsapp"
                            label="WhatsApp"
                            value={whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value) }}
                        />
                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => { setBio(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a consulta</legend>

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
                                { value: 'Pediatra', label: 'Pediatra' },
                                { value: 'Psiquiatra', label: 'Psiquiatra' },
                                { value: 'Urologista', label: 'Urologista' },
                            ]}
                        />
                        <Input
                            name="cost"
                            label="Valor da Consulta"
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                        </button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    />
                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                                </div>
                            )
                        })}
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                        Importante <br />
                        Preencha todos os dados
                    </p>
                        <button type="submit">
                            Salvar Cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default DoctorForm