import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username } = createUserDto;
    const existingUser = await this.usersRepository.findOneBy({ username });
    if (existingUser)
      throw new ConflictException(`username "${username}" already in use`);

    const { password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 8);

    let newUser = this.usersRepository.create(createUserDto);
    newUser = { ...newUser, password: hashedPassword };

    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findByUsername(username: string): Promise<User> {
    const existingUser = await this.usersRepository.findOneBy({ username });
    if (!existingUser)
      throw new NotFoundException(`user with username "${username}" not found`);
    return existingUser;
  }

  async findOne(id: number): Promise<User> {
    const existingUser = await this.usersRepository.findOneBy({ id });
    if (!existingUser)
      throw new NotFoundException(`user with id "${id}" not found`);
    return existingUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.findOne(id);
    if (!existingUser)
      throw new NotFoundException(`user with id "${id}" not found`);

    await this.usersRepository.update(id, updateUserDto);

    const updatedUser = await this.findOne(id);
    if (!updatedUser)
      throw new NotFoundException(`user with id "${id}" not found`);

    return updatedUser;
  }

  async remove(id: number): Promise<User> {
    const existingUser = await this.findOne(id);
    if (!existingUser)
      throw new NotFoundException(`user with id "${id}" not found`);

    await this.usersRepository.update(id, { isActive: false });
    return existingUser;
  }
}
