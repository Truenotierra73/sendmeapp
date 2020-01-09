import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Base de datos
import { TypeOrmModule } from '@nestjs/typeorm';

// Controladores
import { MensajesController } from './mensajes/mensajes.controller';

// Servicios
import { MensajesService } from './mensajes/mensajes.service';

// Entidades
import { Mensaje } from './mensajes/entities/mensaje.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nest',
      password: 'app',
      database: 'sendmeapp_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Mensaje]),
  ],
  controllers: [AppController, MensajesController],
  providers: [AppService, MensajesService],
})
export class AppModule {}
