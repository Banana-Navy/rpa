import { PartialType } from '@nestjs/swagger';
import { CreateInitDatumDto } from './create-init-datum.dto';

export class UpdateInitDatumDto extends PartialType(CreateInitDatumDto) {}
