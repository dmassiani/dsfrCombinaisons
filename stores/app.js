import { acceptHMRUpdate, defineStore } from 'pinia'
import _ from 'lodash'

export const useApp = defineStore('app', {
  state: () => ({
    favories: []
  }),

  getters: {
    getAllFavories(state) {
      return this.favories
    }
  },

  actions: {
    // ################
    // Favories management
    // ################
    addFavorie(bgColor, textColor) {
      let founded = _.findIndex(this.favories, {'background':bgColor, 'text': textColor})
      if( founded >= 0 ) this.favories.splice(founded, 1)
      else this.favories.push({
              background: bgColor,
              text: textColor
            })
    },
    isFavorie(bgColor, textColor) {
      let founded = _.findIndex(this.favories, {'background':bgColor, 'text': textColor})
      if( founded >= 0 ) return true
      else return false
    }
  },
  persist: {
    storage: persistedState.localStorage,
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useApp, import.meta.hot))
}
