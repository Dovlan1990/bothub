import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { UniversalResponseDTO } from '../dtos/universal-response.dto';

const types = new Set<Type>([Boolean, Number, String]);

function getType(type: Type) {
  if (types.has(type)) return { type: type.name.toLowerCase() };

  return { $ref: getSchemaPath(type) };
}

export const UniversalResponse = <DataDto extends Type<unknown>>(dataDto: DataDto, isArray: boolean = false) => {
  const data = isArray ? { type: 'array', items: getType(dataDto) } : getType(dataDto);

  return applyDecorators(
    ApiExtraModels(UniversalResponseDTO, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(UniversalResponseDTO) },
          {
            properties: {
              data,
            },
          },
        ],
      },
    }),
  );
};
