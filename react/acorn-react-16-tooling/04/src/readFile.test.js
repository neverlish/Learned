// import fs from 'fs';
// import readFile from './readFile';

// jest.mock('fs');

// describe('readFile', () => {
//   it('calls fs.readFile', (done) => {
//     fs.readFile.mockReset();
//     fs.readFile.mockImplementation((path, cb) => {
//       cb(false);
//     });

//     readFile('file.txt')
//       .then(() => {
//         expect(fs.readFile).toHaveBeenCalled();
//         done();
//       });
//   });

//   it('resolves a value', (done) => {
//     fs.readFile.mockReset();
//     fs.readFile.mockImplementation((path, cb) => {
//       cb(false, 'test');
//     });

//     readFile('file.txt')
//       .then((data) => {
//         expect(data).toBe('test');
//         done();
//       });
//   });

//   it('rejects on error', (done) => {
//     fs.readFile.mockReset();
//     fs.readFile.mockImplementation((path, cb) => {
//       cb('failed');
//     });

//     readFile('file.txt')
//       .catch((err) => {
//         expect(err).toBe('failed');
//         done();
//       });
//   });
// });

import fs from 'fs';
import readFile from './readFile';

jest.mock('fs');

describe('readFile', () => {
  it('calls fs.readFile', () => {
    fs.readFile.mockReset();
    fs.readFile.mockImplementation((path, cb) => {
      cb(false);
    });

    return readFile('file.txt')
      .then(() => {
        expect(fs.readFile).toHaveBeenCalled();
      });
  });

  it('resolves a value', () => {
    fs.readFile.mockReset();
    fs.readFile.mockImplementation((path, cb) => {
      cb(false, 'test');
    });

    return expect(readFile('file.txt'))
      .resolves
      .toBe('test');
  });

  it('rejects on error', () => {
    fs.readFile.mockReset();
    fs.readFile.mockImplementation((path, cb) => {
      cb('failed');
    });

    return expect(readFile('file.txt'))
      .rejects
      .toBe('failed');
  });
});