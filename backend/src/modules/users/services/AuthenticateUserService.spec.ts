import AppError from '@shared/errors/AppErro';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '../services/CreateUserService';
import AuthenticateUserService from '../services/AuthenticateUserService';

describe('AuthenticateUser', () => {
  const fakeUsersRepository = new FakeUsersRepository();
  const fakeHashProvider = new FakeHashProvider();
  const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  const AuthenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

  it('should be able to create a new Authenticate', async () => {
    const user = await createUserService.execute({
      name: 'Thieres',
      email: 'thieres@email.com',
      password: '123456',
    });

    const response = await AuthenticateUser.execute({
      email: 'thieres@email.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toBe(user);
  });

  it('should not be able to create a new Authenticate with non existing user', async () => {
    expect(AuthenticateUser.execute({
      email: 'joao@email.com',
      password: 'abc123456',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new Authenticate with wrong password', async () => {
    await createUserService.execute({
      name: 'Maria',
      email: 'maria@email.com',
      password: '123456',
    });

    expect(AuthenticateUser.execute({
      email: 'maria@email.com',
      password: 'wrong-password',
    })).rejects.toBeInstanceOf(AppError);
  });
});
