import { v4 } from 'uuid'
import { isEqual } from 'date-fns';

import IAppointmentsRepositories from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepositories {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date)
    );

    return findAppointment;
  };

  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: v4() , provider_id, date })

    // appointment.id = uuid();
    // appointment.provider_id = provider_id;
    // appointment.date = date;

    this.appointments.push(appointment);

    return appointment;
  }
};

export default AppointmentsRepository;
