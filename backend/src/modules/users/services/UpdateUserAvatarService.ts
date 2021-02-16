import path from 'path';
import fs from 'fs';
import {  injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErro';
import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StrorageProvider/models/IStorageProvider';

import User from '../infra/typeorm/entities/User';

import uploadConfig from '@config/upload';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar');
    }

    if (user.avatar) {
     await this.storageProvider.deleteFile(avatarFilename);
    }

    const fileName = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = fileName;

    await this.usersRepository.save(user);

    return user;
  }
};

export default UpdateUserAvatarService;
