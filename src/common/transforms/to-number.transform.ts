import { Transform } from 'class-transformer';

export function ToNumber() {
  return Transform(({ value }) => {
    return Number(value);
  });
}