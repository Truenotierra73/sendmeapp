import { Controller, Post, Body, Get, Put, Delete, Res, HttpStatus, Param } from '@nestjs/common';
import { CreateMensajeDTO } from './dto/create.mensaje.dto';
import { MensajesService } from './mensajes.service';

@Controller('mensajes')
export class MensajesController {

    constructor(
        private readonly mensajesService: MensajesService,
    ) {

    }

    @Post()
    create(@Body() createMensajeDTO: CreateMensajeDTO, @Res() response) {
        this.mensajesService.createMensaje(createMensajeDTO).then(mensaje => {
                response.status(HttpStatus.CREATED).json(mensaje);
            }).catch(err => {
                response.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error en la creación del mensaje'});
            });
    }

    @Get()
    getAll(@Res() response) {
        this.mensajesService.getAll().then(mensajesList => {
            response.status(HttpStatus.OK).json(mensajesList);
        }).catch(err => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error en la obtención de los mensajes'});
        });
    }

    @Put(':id')
    update(@Body() updateMensajeDTO: CreateMensajeDTO, @Res() response, @Param('id') idMensaje) {
        this.mensajesService.updateMensaje(idMensaje, updateMensajeDTO).then(mensajeActualizado => {
            response.status(HttpStatus.OK).json(mensajeActualizado);
        }).catch(err => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error en la edición del mensaje'});
        });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idMensaje) {
        this.mensajesService.deleteMensaje(idMensaje).then(res => {
            response.status(HttpStatus.OK).json(res);
        }).catch(err => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error en la eliminación del mensaje'});
        });
    }
}
