import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faTrash, 
  faPlus, 
  faArrowDown, 
  faPenToSquare, 
  faMagnifyingGlass 
} from '@fortawesome/free-solid-svg-icons'

library.add(faTrash, faPlus, faArrowDown, faPenToSquare, faMagnifyingGlass)

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})