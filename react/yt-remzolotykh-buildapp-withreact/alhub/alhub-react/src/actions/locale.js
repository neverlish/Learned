import { LOCALE_SET } from '../types'

export const localSet = lang => ({
  type: LOCALE_SET,
  lang
})

export const setLocale = lang => dispatch => {
  localStorage.alhubLang = lang
  dispatch(localSet(lang))  
}
