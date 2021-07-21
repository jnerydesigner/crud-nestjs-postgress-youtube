import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HelperFile } from 'src/shared/helper';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    //nda
  }
  create(createUserDto: CreateUserDto) {
    const createUser = this.userRepository.create(createUserDto);
    return createUser.save();
  }

  findAll() {
    return this.userRepository
      .createQueryBuilder('user')
      .orderBy('created_at', 'DESC')
      .getMany();
  }

  findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);

    const updatedPost = await this.userRepository.findOne(id);

    if (!updatedPost) {
      throw new Error('user does not exists');
    }
    return updatedPost;
  }

  async remove(id: string) {
    const deleteUser = await this.userRepository.findOne(id);
    if (!deleteUser) {
      throw new Error('user does not exists');
    }
    return deleteUser.remove();
  }

  async updateAvatar(id: string, file: string) {
    const userAvatar = await this.userRepository.findOne(id);

    if (userAvatar.avatar === null || userAvatar.avatar === '') {
      await this.userRepository.update(id, {
        avatar: file,
      });
    } else {
      await HelperFile.removeFile(userAvatar.avatar);

      await this.userRepository.update(id, {
        avatar: file,
      });
    }

    const user = await this.userRepository.findOne(id);

    return user;
  }
}
