import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { InitDataService } from './init-data.service';
import { InitDataDto } from './dto/create-init-datum.dto';
import { UpdateInitDatumDto } from './dto/update-init-datum.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('init-data')
@Controller('init-data')
export class InitDataController {
  constructor(private readonly initDataService: InitDataService) {}

  @Post('')
  @ApiOperation({
    description:
      'Create a document in the MongoDB "init-data" collection by uploading an Excel file',
  })
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file) {
    return this.initDataService.create(file);
  }

  // @Get('/ratio')
  // getRatio() {
  //   try {
  //     return this.initDataService.getRatio();
  //   } catch (error) {
  //     return error;
  //   }
  // }

  @Get('')
  @ApiOperation({
    description: 'Retrieve information from "init-data"',
  })
  getData() {
    try {
      return this.initDataService.getData();
    } catch (error) {
      return error;
    }
  }

  @Put('')
  @ApiResponse({
    type: InitDataDto,
  })
  @ApiOperation({
    description: 'Update user-specific data in the "init-data" resource.',
  })
  async updateData(@Body() data) {
    try {
      return this.initDataService.updateData(data);
    } catch (error) {
      return error;
    }
  }
}
