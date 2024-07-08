import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const foundUser = await this.usersRepository.findOneBy({
      username: createUserDto.username,
    });
    if (foundUser) throw new ConflictException(`username in use`);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 8);

    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findByUsername(username: string): Promise<User> {
    const foundUser = await this.usersRepository.findOneBy({ username });
    if (!foundUser)
      throw new NotFoundException(`user with username "${username}" not found`);
    return foundUser;
  }

  async findOne(id: number): Promise<User> {
    const foundUser = await this.usersRepository.findOneBy({ id });
    if (!foundUser)
      throw new NotFoundException(`user with id "${id}" not found`);
    return foundUser;
  }

  // FIX: username conflict
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const foundUser = await this.usersRepository.findOneBy({ id });
    if (!foundUser)
      throw new NotFoundException(`user with id "${id}" not found`);

    await this.usersRepository.update(id, updateUserDto);

    const updatedUser = await this.findOne(id);
    if (!updatedUser)
      throw new NotFoundException(`user with id "${id}" not found`);

    return updatedUser;
  }

  async remove(id: number): Promise<User> {
    const foundUser = await this.findOne(id);
    if (!foundUser)
      throw new NotFoundException(`user with id "${id}" not found`);

    await this.usersRepository.update(id, { isActive: false });
    return foundUser;
  }
}
