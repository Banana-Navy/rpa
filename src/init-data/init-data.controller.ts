import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { InitDataService } from './init-data.service';
import { CreateInitDatumDto } from './dto/create-init-datum.dto';
import { UpdateInitDatumDto } from './dto/update-init-datum.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
ApiTags('init-data');
@Controller('init-data')
export class InitDataController {
  constructor(private readonly initDataService: InitDataService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file) {
    return this.initDataService.create(file);
  }

  @Get('/ratio')
  getRatio() {
    try {
      return this.initDataService.getRatio();
    } catch (error) {
      return error;
    }
  }
}
