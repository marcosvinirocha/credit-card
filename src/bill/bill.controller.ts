import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/is-public.decorator';
import BillFilterDTO from './types/bill-filter.dto';

@IsPublic()
@ApiTags('Bills')
// @ApiBearerAuth('JWT')
@Controller('bill')
export class BillController {
  @Get()
  getBills(@Query() params: BillFilterDTO) {
    return params;
  }
}
