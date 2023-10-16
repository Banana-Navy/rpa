import { PartialType } from '@nestjs/swagger';
import { InitDataDto } from './create-init-datum.dto';

export class UpdateInitDatumDto extends PartialType(InitDataDto) {}
