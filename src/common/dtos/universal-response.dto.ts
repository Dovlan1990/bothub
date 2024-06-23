import { ApiResponseProperty } from '@nestjs/swagger';

export class UniversalResponseDTO<T> {
  @ApiResponseProperty({ example: null })
  data: T | null;
  @ApiResponseProperty({ example: null })
  error: Object | null;
  @ApiResponseProperty({ example: 'OK' })
  status: 'Error' | 'Success';
}
