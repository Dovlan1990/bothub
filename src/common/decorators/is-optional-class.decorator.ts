import { Type } from '@nestjs/common';
import { ValidationOptions, MetadataStorage, ValidationTypes, IsOptional } from 'class-validator';
import { get } from 'lodash';

export function IsOptionalCustom(validationOptions?: ValidationOptions) {
  return function (target: Type<unknown>, propertyKey: string) {
    const metadataStorage = get(global, 'classValidatorMetadataStorage') as unknown as MetadataStorage;

    const propertyMeta = metadataStorage.groupByPropertyName(
      metadataStorage.getTargetValidationMetadatas(target, '', true, false),
    )[propertyKey];

    if (!propertyMeta) return;

    const notEqual = propertyMeta.find((el) => el.name === 'notEquals');

    if (notEqual && notEqual.constraints.includes(null)) {
      const args = {
        type: ValidationTypes.CONDITIONAL_VALIDATION,
        name: 'isOptionalCustom',
        target,
        propertyName: propertyKey,
        constraints: [
          (object: Record<string, unknown>): boolean => {
            return object[propertyKey] !== undefined;
          },
        ],
        message: validationOptions?.message,
        groups: validationOptions?.groups ?? [],
        always: validationOptions?.always,
        each: validationOptions?.each ?? false,
        context: validationOptions?.context,
      } as unknown as Parameters<MetadataStorage['addValidationMetadata']>[0];

      metadataStorage.addValidationMetadata(args);
    } else {
      IsOptional()(target, propertyKey);
    }
  };
}

export function IsOptionalClass() {
  return function (target: Type<unknown>) {
    const keys: string[] =
      Reflect.getMetadata('swagger/apiModelPropertiesArray', target.prototype)?.map((el: string) => el.slice(1)) ?? [];

    for (const key of keys) IsOptionalCustom()(target, key);
  };
}
