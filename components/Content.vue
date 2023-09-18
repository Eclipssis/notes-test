<template>
  <div class="content">

    <template v-if="noteStore.selectedNote">
      <span v-if="!isEdit" @click="isEdit = !isEdit" class="cursor-pointer">
        <font-awesome-icon icon="pen-to-square" />
      </span>

      <button v-if="isEdit" @click="isEdit = !isEdit" class="edit-button">
        M
        <font-awesome-icon icon="arrow-down" />
      </button>
    </template>
    
    <div v-if="isEdit">
      <textarea 
        :value="noteStore.selectedNote?.rawText" 
        @input="onUpdate" 
        class="content__edit"
      ></textarea>
    </div>

    <div v-if="!isEdit && noteStore.selectedNote" v-html="compiledMarkdown"></div>

    <div v-if="!noteStore.selectedNote">
      Please select note
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { marked } from "marked";
import { useNotesStore } from '~/stores/notes'


export default defineComponent({
  setup () {
    const noteStore = useNotesStore()
    let input: Ref<string | undefined> = ref(noteStore.selectedNote?.rawText)
    let isEdit: Ref<boolean> = ref(false)

    function stripHtml(html: string): string {
      let tmp = document.createElement("div")
      tmp.innerHTML = html
      return tmp.textContent || tmp.innerText || ""
    }

    const onUpdate = (event: Event) => {
      if (event.target) {
        const rawText = event.target.value
        const title = rawText.split('\n')[0]
        let data = rawText.split('\n')
        data.shift()
        const body = data.join(' ')

        const note = {
          ...noteStore.selectedNote,
          title: stripHtml(marked.parse(title)),
          body,
          rawText,
          createdAt: new Date()
        }
        noteStore.updateNote(note)
      }
    }

    const compiledMarkdown = computed(() => {
      if (noteStore.selectedNote?.rawText) {
        return marked.parse(noteStore.selectedNote?.rawText)
      }
    })

    return {
      input,
      isEdit,
      onUpdate,
      compiledMarkdown,
      noteStore
    }
  }
})
</script>

<style scoped>
.content {
  flex-grow: 1;
  padding: 55px 15px 15px 15px;
}

.content__edit {
  height: 100vh;
  width: 100%;
  border: none;
}

.edit-button {
  border: none;
  background: #5f5c5c;
  color: #fff;
  border-radius: 5px;
  padding: 2px 5px;
  font-size: 10px;
  cursor: pointer;
}
</style>