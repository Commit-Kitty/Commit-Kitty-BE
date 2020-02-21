const User = require('./User');

describe('USER MODEL', () => {

  it('throw error for required fields', () => {
    const user = new User();
    const { errors } = user.validateSync();

    expect(errors.userName.message).toEqual('Path `userName` is required.');
    expect(errors.role.message).toEqual('Path `role` is required.');
    expect(errors.email.message).toEqual('Path `email` is required.');
    expect(errors.passwordHash.message).toEqual('Path `passwordHash` is required.');
  });

  it('should hash the password', () => {
    const user = new User({
      email: 'test@test.com',
      password: '1234',
      role: 'Admin'
    });
    expect(user.passwordHash).toEqual(expect.any(String));
  });

  it('', () => {
    
  });
});
