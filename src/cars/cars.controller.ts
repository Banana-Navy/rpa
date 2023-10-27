import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  Body,
  Query,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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

  @Post('/addOneCar')
  @ApiOperation({
    description: 'Add one car',
  })
  async addOneCar(@Body() data) {
    try {
      const response = await this.carsService.addOneCar(data);
      return response;
    } catch (error) {
      return error;
    }
  }

  @Get()
  @ApiQuery({
    name: 'weeks',
    required: false,
    type: Number,
    description: 'Number of weeks',
  })
  @ApiResponse({ status: 200, type: CarDto, isArray: true })
  async getCars(@Query('weeks') weeks: number): Promise<CarDto[]> {
    try {
      return await this.carsService.getCars(weeks);
    } catch (error) {
      return error;
    }
  }

  @Get(':carId')
  getCar(@Param('carId') carId: string): Promise<CarDto> {
    try {
      console.log(carId);

      return this.carsService.getCar(carId);
    } catch (error) {
      return error;
    }
  }
}
