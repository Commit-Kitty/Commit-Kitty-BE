const User = require('./User');

describe('USER MODEL', () => {
  it('throw error for required fields', () => {
    const user = new User();
    const { errors } = user.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
    expect(errors.role.message).toEqual('Path `role` is required.');
    expect(errors.email.message).toEqual('Path `email` is required.');
    expect(errors.passwordHash.message).toEqual('Path `passwordHash` is required.');
  });
});
