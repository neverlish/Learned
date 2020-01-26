describe('메서드 generatePassword', () => {
  let password
  generatePassword = require('../generate-password')
  it('여덟 자의 영문 소문자 및 숫자로 생성된 비밀번호를 반환한다', (done) => {
    password = generatePassword()
    expect(password).toMatch(/^[a-z0-9]{8}$/)
    done()
  })
})
