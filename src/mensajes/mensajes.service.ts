import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensaje } from './entities/mensaje.entity';
import { CreateMensajeDTO } from './dto/create.mensaje.dto';

@Injectable()
export class MensajesService {
    constructor(
        @InjectRepository(Mensaje)
        private readonly mensajeRepository: Repository<Mensaje>,
      ) {}

      async getAll(): Promise<Mensaje[]> {
        return await this.mensajeRepository.find();
      }

      async createMensaje(mensaje: CreateMensajeDTO): Promise<Mensaje> {
          const nuevoMensaje = new Mensaje();
          nuevoMensaje.mensaje = mensaje.mensaje;
          nuevoMensaje.nick = mensaje.nick;

          return await this.mensajeRepository.save(nuevoMensaje);
      }

      async updateMensaje(idMensaje: number, mensaje: CreateMensajeDTO): Promise<Mensaje> {
          const updateMensaje = await this.mensajeRepository.findOne(idMensaje);
          updateMensaje.mensaje = mensaje.mensaje;
          updateMensaje.nick = mensaje.nick;

          return await this.mensajeRepository.save(updateMensaje);
      }

      async deleteMensaje(idMensaje: number): Promise<any> {
        return await this.mensajeRepository.delete(idMensaje);
      }
}
