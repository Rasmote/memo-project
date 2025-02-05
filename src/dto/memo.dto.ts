import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateMemoDto {
    @IsString()
    title: string;

    @IsString()
    content: string;
}

export class UpdateMemoDto {
    @IsNumber()
    num: number;

    @IsString()
    title: string;

    @IsString()
    content: string;
}

export class ReadMemoDto {
    @IsNumberString()
    num: number;
}

export class DeleteMemoDto {
    @IsNumberString()
    num: number;
}