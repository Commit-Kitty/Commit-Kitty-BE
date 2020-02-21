const Dev = require('./Dev');

describe('tests for Dev model', () => {
  it('throws an error for required fields', () => {
    const dev = new Dev();
    const { errors } = dev.validateSync();

    expect(errors.devName.message).toEqual('Path `devName` is required.');
    expect(errors.devGitHubHandle.message).toEqual('Path `devGitHubHandle` is required.');
  });

});
