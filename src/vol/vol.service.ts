import { Injectable, Inject } from '@nestjs/common';
import { CreateVolDto } from './dto/create-vol.dto';
import { UpdateVolDto } from './dto/update-vol.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vol, VolDocument } from './schemas/vol.schemas';
import { ClientProxy } from '@nestjs/microservices';

/**
 * Vol service
 * Classe de service responsable du stockage et de la récupération des données de vol
 */

@Injectable()
export class VolService {
  constructor(
    @InjectModel(Vol.name) private volModel: Model<VolDocument>,
    @Inject('FLIGHT_TOKEN_SERVICE') private client: ClientProxy,
  ) {}

  async create(createVolDto: CreateVolDto): Promise<VolDocument> {
    const createdUser = new this.volModel(createVolDto);
    return createdUser.save();
  }

  async findAll(): Promise<VolDocument[]> {
    return this.volModel.find().exec();
  }

  async findOne(
    flightNumber: string,
    departureDate: string,
  ): Promise<VolDocument> {
    return this.volModel.findOne({ flightNumber, departureDate }).exec();
  }

  async findManyByOpCode(operatingAirlineCode: string): Promise<VolDocument[]> {
    return this.volModel.find({ operatingAirlineCode }).exec();
  }

  async update(
    flightNumber: string,
    departureDate: string,
    updateVolDto: UpdateVolDto,
  ): Promise<VolDocument> {
    return this.volModel
      .findOneAndUpdate({ flightNumber, departureDate }, updateVolDto, {
        new: true,
      })
      .exec();
  }

  async remove(
    flightNumber: string,
    departureDate: string,
  ): Promise<VolDocument> {
    return this.volModel
      .findOneAndDelete({ flightNumber, departureDate })
      .exec();
  }
}
