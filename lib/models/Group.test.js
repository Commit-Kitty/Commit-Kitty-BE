const Group = require('./Group');
const mongoose = require('mongoose');

describe('tests for Group model', () => {

  it('throws an error for required fields', () => {
    const group = new Group();
    const { errors } = group.validateSync();

    expect(errors.groupName.message).toEqual('Path `groupName` is required.');
    expect(errors.adminId.message).toEqual('Path `adminId` is required.');
    expect(errors.devsInGroup.message).toEqual('A group needs at least one dev in it to be valid.');


  });




});
