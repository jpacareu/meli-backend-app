const error = require('../../../middleware/error');

const err = {};
const req = {};
let spySend;
let res;
let next;

describe('error middleware', () => {
  beforeEach(() => {
    spySend = jest.fn();
     res = {
        status: jest.fn().mockReturnValue({send: spySend})
    };
     next = jest.fn();    
  });
  it('should call status with 500', () => {
    error(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('should call send with a "Something failed" message', () => {
    error(err, req, res, next);

    expect(spySend).toHaveBeenCalledWith("Something failed.");
  });
  
  it('should not call next as this is the end of the execution', () => {

    error(err, req, res, next);

    expect(next).not.toHaveBeenCalled();
  });
});