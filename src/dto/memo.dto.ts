import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMemoDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;
}

export class UpdateMemoDto {
    @IsNotEmpty()
    @IsNumber()
    num: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;
}