import AppError from '@shared/errors/AppErro';

import FakeUsersRepository from '../repositories/Fakes/FakeUsersRepository';
import CreateUserService from '../services/CreateUserService';

describe('CreateUser', () => {
  const fakeUsersRepository = new FakeUsersRepository();
  const createUserService = new CreateUserService(fakeUsersRepository);

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Thieres',
      email: 'thieres@email.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('thieres@email.com');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const userEmail = 'thiereslima@email.com';

    await createUserService.execute({
      name: 'Thieres',
      email: userEmail,
      password: '123456',
    });

    expect(
      createUserService.execute({
        name: 'Thieres',
        email: userEmail,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
