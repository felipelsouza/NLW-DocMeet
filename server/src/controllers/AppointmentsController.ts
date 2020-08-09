import { Request, Response } from 'express' 

import db from '../database/connection'
import convertHourToMinutes from '../utils/convertHourToMinutes'

interface ScheduleItem {
    week_day: number,
    from: string,
    to: string,
}

export default class AppointmentsController {
    async index(req: Request, res: Response) {
        const filters = req.query

        const specialization = filters.specialization as string
        const week_day = filters.week_day as string
        const time = filters.time as string

        if (!filters.week_day || !filters.specialization || !filters.time) {
            return res.status(400).json({
                error: 'Missing filters to search Appointments'
            })
        }

        const timeInMinutes = convertHourToMinutes(time)

        const appointments = await db('appointments')
            .whereExists(function() {
                this.select('appointments_schedule.*')
                    .from('appointments_schedule')
                    .whereRaw('`appointments_schedule`.`appointments_id` = `appointments`.`id`')
                    .whereRaw('`appointments_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`appointments_schedule`.`from` <= ??', (timeInMinutes))
                    .whereRaw('`appointments_schedule`.`to` > ??', (timeInMinutes))
            })
            .where('appointments.specialization', '=', specialization)
            .join('users', 'appointments.user_id', '=', 'users.id')
            .select(['appointments.*', 'users.*'])

        return res.json(appointments)
    }
    
    async create (req: Request, res: Response) {
        const {
            name,
            crm,
            avatar,
            whatsapp,
            bio,
            specialization,
            cost,
            schedule
        } = req.body
    
        const trx = await db.transaction()
    
        try {
            const insertedUserIds = await trx('users').insert({
                name,
                crm,
                avatar,
                whatsapp,
                bio
            })
    
            const user_id = insertedUserIds[0]
    
            const insertedAppointmentsIds = await trx('appointments').insert({
                specialization,
                cost,
                user_id
            })
    
            const appointments_id = insertedAppointmentsIds[0]
    
            const appointmentsSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    appointments_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
                }
            })
    
            await trx('appointments_schedule').insert(appointmentsSchedule)
    
            await trx.commit()
    
            return res.status(201).send()
        } catch (err) {
            console.log(err)
            
            await trx.rollback()
            
            return res.status(400).json({
                error: 'Unexpected error while creating new class'
            })
        }
    }
}