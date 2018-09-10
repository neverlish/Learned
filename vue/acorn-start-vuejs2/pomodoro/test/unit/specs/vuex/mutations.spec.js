import Vue from 'vue'
import mutations from '@/vuex/mutations'
import * as types from '@/vuex/mutation_types'

describe('mutations', () => {
  var state

  beforeEach(() => {
    state = {}

    // 소음 플러그인을 모킹해서 해당 메소드 호출을 감시한다
    Vue.noise = {
      start: () => {},
      stop: () => {},
      pause: () => {}
    }
    jest.spyOn(Vue.noise, 'start')
    jest.spyOn(Vue.noise, 'stop')
    jest.spyOn(Vue.noise, 'pause')
  })

  afterEach(() => {
    Vue.noise.start.mockRestore()
    Vue.noise.stop.mockRestore()
    Vue.noise.pause.mockRestore()
  })

  describe('START', () => {
    it('should set all the state properties correctly after start', () => {
      // start 메소드를 호출하기 전에 모든 속성들이 undefined인지 확인한다
      expect(state.started).toBeUndefined()
      expect(state.stopped).toBeUndefined()
      expect(state.paused).toBeUndefined()
      expect(state.interval).toBeUndefined()
      // start 메소드 호출
      mutations[types.START](state)
      // 모든 속성들이 제대로 설정됐는지 확인한다
      expect(state.started).toBe(true)
      expect(state.stopped).toBe(false)
      expect(state.paused).toBe(false)
      expect(state.interval).not.toBeUndefined()
    })

    it('should call Vue.noise.start method if both state.isWorking and state.soundEnabled are true', () => {
      state.isWorking = true
      state.soundEnabled = true
      mutations[types.START](state)
      expect(Vue.noise.start).toHaveBeenCalled()
    })

    it('should not call Vue.noise.start method if both state.isWorking is not true', () => {
      state.isWorking = false
      state.soundEnabled = true
      mutations[types.START](state)
      expect(Vue.noise.start).not.toHaveBeenCalled()
    })

    it('should not call Vue.noise.start method if both state.soundEnabled is not true', () => {
      state.isWorking = true
      state.soundEnabled = false
      mutations[types.START](state)
      expect(Vue.noise.start).not.toHaveBeenCalled()
    })
  })
})
