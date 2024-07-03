import { IsEnum, IsOptional, IsString } from 'class-validator';

enum Sort {
  newest = 'newest',
  oldest = 'oldest',
  price = 'price',
}

export class SearchParams {
  @IsOptional()
  @IsEnum(Sort)
  sort: Sort;

  @IsOptional()
  @IsString()
  filter: string;
}
