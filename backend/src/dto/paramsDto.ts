import { IsInt } from 'class-validator';

export class ParamsDto {
    @IsInt()
    id!: number;
}