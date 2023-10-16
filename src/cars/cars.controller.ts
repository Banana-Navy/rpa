import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CarDto } from './dto/create-cars.dto';

@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @ApiOperation({
    description: 'adding cars by uploading an Excel file',
  })
  @ApiResponse({
    type: CarDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file) {
    try {
      return await this.carsService.create(file);
    } catch (error) {
      console.error(error);
      return `error in controller ${error}`;
    }
  }

  @Get()
  async getCars(): Promise<CarDto[]> {
    try {
      return await this.carsService.getCars();
    } catch (error) {
      return error;
    }
  }

  @Get(':carId')
  getCar(@Param('carId') carId: string): Promise<CarDto> {
    try {
      return this.carsService.getCar(carId);
    } catch (error) {
      return error;
    }
  }
}
