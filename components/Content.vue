<template>
  <div class="content">

    <div class="content__panel">
      <div v-if="noteStore.selectedNote" class="content__controls">
        <span v-if="!isEdit" @click="isEdit = !isEdit" class="cursor-pointer">
          <font-awesome-icon icon="pen-to-square" />
        </span>

        <button v-if="isEdit" @click="isEdit = !isEdit" class="edit-button">
          M
          <font-awesome-icon icon="arrow-down" />
        </button>
      </div>

      <div class="search">
        <span class="search__icon">
          <font-awesome-icon icon="magnifying-glass" />
        </span>
        <input :value="noteStore.searchText" @input="onSearch" placeholder="Search" class="search__input">
      </div>
    </div>

    <div v-if="noteStore.selectedNote" class="content__date">
      {{ formatNoteDate }}
    </div>
    
    <div v-if="isEdit" class="content__body">
      <textarea 
        :value="noteStore.selectedNote?.rawText" 
        @input="onUpdate" 
        class="content__edit"
      ></textarea>
    </div>
    
    <div v-if="!isEdit && noteStore.selectedNote" v-html="compiledMarkdown"></div>

    <div v-if="!noteStore.selectedNote" class="content__empty">
      Please select the note
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
    const { formatTime } = useDate()

    let isEdit: Ref<boolean> = ref(false)

    function stripHtml(html: string): string {
      let tmp = document.createElement("div")
      tmp.innerHTML = html
      return tmp.textContent || tmp.innerText || ""
    }

    const onUpdate = (event: Event) => {
      const target = event.target as HTMLTextAreaElement
      if (target) {
        const rawText = target.value
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

    const onSearch = (event: Event) => {
      const target = event.target as HTMLTextAreaElement
      if (target) {
        noteStore.setSearchText(target.value)
      }
    }

    const formatNoteDate = computed(() => {
      if (noteStore.selectedNote?.rawText) {
        const day = noteStore.selectedNote.createdAt.getDate()
        const month = noteStore.selectedNote.createdAt.getMonth()
        const year = noteStore.selectedNote.createdAt.getFullYear()

        const time = formatTime(noteStore.selectedNote.createdAt)

        return `${day}/${month}/${year}, ${time}`
      }
    })

    const compiledMarkdown = computed(() => {
      if (noteStore.selectedNote?.rawText) {
        return marked.parse(noteStore.selectedNote?.rawText)
      }
    })

    noteStore.$subscribe((mutation, state) => {
      if (!state.selectedNote) {
        isEdit.value = false
      }
    })

    return {
      isEdit,
      onUpdate,
      onSearch,
      compiledMarkdown,
      noteStore,
      formatNoteDate
    }
  }
})
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0 15px 15px 15px;
}

.content__panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.content__controls {
  position: absolute;
  top: 15px;
  right: 15px
}

.content__body {
  height: 100%;
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
}

.content__empty {
  text-align: center;
  font-size: 22px;
}

.content__edit {
  height: 100%;
  width: 100%;
  border: none;
  resize: none;
  flex: 1 1 100%
}

.content__date {
  text-align: center;
  margin-bottom: 15px;
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

.search {
  position: relative;
  width: 100%;
  margin-left: auto;
}

.search__icon {
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translate(0, -50%);
  color: #5f5c5c;
  font-size: 13px;
}

.search__input {
  border: 1px solid #5f5c5c;
  border-radius: 5px;
  height: 30px;
  padding-left: 25px;
  width: 100%;
}

@media screen and (min-width: 769px) {
  .content {
    padding-top: 15px;
  }

  .content__body {
    flex-direction: row;
  }

  .content__panel {
    margin-bottom: 50px;
  }

  .content__controls {
    position: static;
  }

  .search {
    max-width: 200px;
  }
}
</style>