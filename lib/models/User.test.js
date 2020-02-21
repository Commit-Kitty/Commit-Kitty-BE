import User from './User';

describe('USER MODEL', () => {
  it('throw error for required fields', () => {
    const user = new User();
    const { errors } = user.validateSync();

    expect(errors.name.message).toEqual('Path \'name\' is required.');
  });
});
