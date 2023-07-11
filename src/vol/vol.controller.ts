/* eslint-disable prefer-const */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VolService } from './vol.service';
import { CreateVolDto } from './dto/create-vol.dto';
import { UpdateVolDto } from './dto/update-vol.dto';
import axios from 'axios';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller('vol')
export class VolController {
  constructor(private readonly volService: VolService) {}

  @MessagePattern({ cmd: 'pilot' })
  getPilot(name: string): string {
    console.log(name);
    return `Hello ${name}`;
  }

  @Post()
  create(@Body() createVolDto: CreateVolDto) {
    const url1 = `http://localhost:3003/aeroport/${createVolDto.departureAirportCode}`;
    const url2 = `http://localhost:3003/aeroport/${createVolDto.arrivalAirportCode}`;
    let volDto = new CreateVolDto();
    volDto = createVolDto;
    axios
      .get(url1)
      .then(async (response) => {
        // Traitez la réponse de la requête ici
        response = await axios.get(url1);
        volDto.departureAirportCode = response.data.code;
        volDto.departureCity = response.data.city;
        //console.log(response.data);
      })
      .catch((error) => {
        // Gérez les erreurs ici
        //console.error(error);
      });

    axios
      .get(url2)
      .then(async (response) => {
        // Traitez la réponse de la requête ici
        response = await axios.get(url2);
        volDto.arrivalAirportCode = response.data.code;
        //console.log(createVolDto);
        volDto.arrivalCity = response.data.city;
        console.log(volDto);
        return this.volService.create(volDto);
      })
      .catch((error) => {
        // Gérez les erreurs ici
        //console.error(error);
      });
    console.log(volDto);

    //return this.volService.create(volDto);
  }

  @Get()
  findAll() {
    return this.volService.findAll();
  }

  @Get(':flightNumber/:departureDate')
  findOne(
    @Param('flightNumber') flightNumber: string,
    @Param('departureDate') departureDate: string,
  ) {
    return this.volService.findOne(flightNumber, departureDate);
  }

  @Get('operatingCode/:operatingAirlineCode')
  find(@Param('operatingAirlineCode') operatingAirlineCode: string) {
    return this.volService.findManyByOpCode(operatingAirlineCode);
  }

  @Patch(':flightNumber/:departureDate')
  update(
    @Param('flightNumber') flightNumber: string,
    @Param('departureDate') departureDate: string,
    @Body() updateVolDto: UpdateVolDto,
  ) {
    return this.volService.update(flightNumber, departureDate, updateVolDto);
  }

  @Delete(':flightNumber/:departureDate')
  remove(
    @Param('flightNumber') flightNumber: string,
    @Param('departureDate') departureDate: string,
  ) {
    return this.volService.remove(flightNumber, departureDate);
  }
}
