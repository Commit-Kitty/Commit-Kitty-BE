const User = require('./User');

describe('USER MODEL', () => {
  it('throw error for required fields', () => {
    const user = new User();
    const { errors } = user.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.') 
    && (errors.role.message).toEqual('Path `role` is required.')
    && (errors.email.message).toEqual('Path `email` is required.');
  });
});
