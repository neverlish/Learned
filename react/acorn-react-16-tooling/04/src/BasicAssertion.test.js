// 기본 일치
describe('basic equality', () => {
  it('true is true', () => {
    expect(true).toBe(true);
    expect(true).not.toBe(false);
  });

  it('false is false', () => {
    expect(false).toBe(false);
    expect(false).not.toBe(true);
  });
});

// 근사 일치
describe('approximate equality', () => {
  it('1 is truthy', () => {
    expect(1).toBeTruthy();
    expect(1).not.toBeFalsy();
  });

  it('\'\' is falsy', () => {
    expect('').toBeFalsy();
    expect('').not.toBeTruthy();
  });
});

// 값 일치
describe('value equality', () => {
  it('objects are the same', () => {
    expect({
      one: 1,
      two:2
    }).toEqual({
      one: 1,
      two: 2
    });

    expect({
      one: 1,
      two: 2
    }).not.toBe({
      one: 1,
      two: 2
    })
  });

  it('arrays are the same', () => {
    expect([1, 2]).toEqual([1, 2]);
    expect([1, 2]).not.toBe([1, 2]);
  });
});

// 컬렉션의 값
describe('object properties and array values', () => {
  it('objeect has property value', () => {
    expect({
      one: 1,
      two: 2
    }).toHaveProperty('two', 2);

    expect({
      one: 1,
      two: 2
    }).not.toHaveProperty('two', 3);
  });

  it('arrays contains value', () => {
    expect([1, 2]).toContain(1);
    expect([1, 2]).not.toContain(3);
  });
});