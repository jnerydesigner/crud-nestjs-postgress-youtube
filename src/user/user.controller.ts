import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join, resolve } from 'path';
import { HelperFile } from 'src/shared/helper';
import { Response } from 'express';

@Controller('users')
export class UserController {
  public nameFileNew: string;
  constructor(private readonly userService: UserService) {
    //nda
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Patch(':id/avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './upload/avatar',
        filename: HelperFile.customFilename,
      }),
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
    }),
  )
  updateAvatar(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.updateAvatar(id, file.path, file.filename);
  }

  @Get('profile-image/:imagename')
  findProfileImage(
    @Param('imagename') imagename: string,
    @Res() res: Response,
  ) {
    return res.sendFile(imagename, {
      root: './upload/avatar',
    });
  }
}
