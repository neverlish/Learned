import { defineStore } from 'pinia';

// store 만들기
export const useStore = defineStore('main', {
  state: () => ({
    // 상태변수 정의
    weatherData: {
      icon: 'icon',
      temp: 0,
      text: 'text',
      location: 'location',
      city: 'Seoul',
    },
    toggle: false, // true일때 about을 보여주기
  }),
  actions: {
    // 함수
    addCount(palyload) { 
      this.count += 1 + palyload;
    },
    updateWeather(payload) {
      this.weatherData.icon = payload.weather[0].icon;
      this.weatherData.temp = payload.main.temp;
      this.weatherData.text = payload.weather[0].description;
      this.weatherData.location = payload.sys.country;
      this.weatherData.city = payload.name;
    },
    onSearchCity(payload) {
      this.weatherData.city = payload;
    },
    toggleButton(state) {
      this.toggle = !this.toggle;
    },
    // 비동기 함수 async 
    async getWeather() {
      const API_KEY = import.meta.env.VITE_API_KEY;
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.weatherData.city}&appid=${API_KEY}`
      await fetch(API_URL)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          // mutation 함수로 날씨 정보 업데이트
          // context.commit('updateWeather', data);
          this.updateWeather(data);
        })
        .catch(err => {
          alert('에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        })
    }
  }
})

// useStore 내보내기