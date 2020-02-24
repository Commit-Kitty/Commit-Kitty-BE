const Group = require('./Group');

describe('tests for Group model', () => {

  it('throws an error for required fields', () => {
    const group = new Group();
    const { errors } = group.validateSync();

    expect(errors.groupName.message).toEqual('Path `groupName` is required.');
    expect(errors.adminIds.message).toEqual('A group needs at least one admin for it to be valid.');
    expect(errors.devsInGroup.message).toEqual('A group needs at least one dev in it to be valid.');
  });

});
