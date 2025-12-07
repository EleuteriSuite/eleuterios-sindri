<template>
  <div class="text-sm font-medium text-gray-700 mt-3 overflow-hidden">File: <span v-html="filePath.split('\\').pop()" /></div>
  <div class="text-sm font-medium text-gray-700 my-3">
    State: <span v-if="fileSaved">Saved</span><span v-else>To save...</span>
  </div>
  <!--<QuillEditor
    theme="snow"
    class="mt-3 min-h-[37vh] max-h-[37vh] overflow-y-auto"
    v-model:content="htmlContent"
    contentType="html"
    :toolbar="toolbarOptions"
    @update:content="convertHTMLtoMarkdown"
    @selectionChange="handleSelectionChange"
  />-->
  <div class="mt-3 min-h-[37vh] max-h-[37vh] overflow-y-auto">
    <template v-for="(block, idx) in blockTree" :key="idx">
      <div class="p-2 border border-gray-200 rounded-md grid grid-cols-7">
        <div
          class="col-span-5 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md"
          @click="currentSindriComponent = block"
        >
          {{ block.category }}: {{ block.block }}
        </div>
        <div class="py-2 ml-4">
          <Icon
            :icon="radixIcons.icons['arrow-up']"
            class="w-4 h-4 text-primary hover:text-secondary cursor-pointer"
            @click="reorderBlock(idx, 'up')"
          />
        </div>
        <div class="py-2 ml-2">
          <Icon
            :icon="radixIcons.icons['arrow-down']"
            class="w-4 h-4 text-primary hover:text-secondary cursor-pointer"
            @click="reorderBlock(idx, 'down')"
          />
        </div>
      </div>
    </template>
  </div>
  <div
    class="h-[37vh] overflow-y-auto bg-gray-100 border border-gray-200 rounded-md p-3 mt-3 grid grid-cols-1 gap-4"
  >
    <SindriBlockForm
      v-if="currentSindriComponent"
      v-model="currentSindriComponent.config"
      :category="currentSindriComponent.category"
      :block="currentSindriComponent.block"
      :index="currentSindriComponent.index"
      @change="handleSindriComponentUpdate"
    />
  </div>
</template>
<script setup lang="ts">
// import { QuillEditor } from '@vueup/vue-quill'
// import { nextTick, onMounted, onUnmounted, ref, toRaw, watch } from 'vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import {
  SindriComponent,
  SindriMarketingBlockFactory
} from '@renderer/components/sindri/marketing/sindri_marketring'
import { SindriUIBlockFactory } from '@renderer/components/sindri/ui/sindri_ui'
import SindriBlockForm from '@renderer/components/sindri/SindriBlockForm.vue'
import YAML from 'yaml'
// import { getParentBlock, getParentCodeBlock } from '@renderer/utils/quill'
// import TurndownService from 'turndown'
import { marked } from 'marked'
import radixIcons from '@iconify-json/radix-icons/icons.json'
import { Icon } from '@iconify/vue'

// const emit = defineEmits(['htmlToMarkdownConverted'])
const emit = defineEmits(['markdownUpdated'])

// Sindri component
const currentSindriComponent = ref<SindriComponent | null>(null)

const { filePath, fileSaved } = defineProps(['filePath', 'fileSaved'])

// Editor content
/*const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote'],
  ['link'],
  // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

  [{ header: [1, 2, 3, 4, 5, 6, false] }]
]*/
// const htmlContent = defineModel('htmlContent', { type: String, required: true })
const markdownContent = defineModel('markdownContent', { type: String, required: true })
let markdownContentModified: number|null = null
const markdownContentMilisecondsToAutosave: number = 2000
// let currentParentNodeSelected: Node | null = null
let sindriComponentToAdd: object | null = null

/*const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
})*/

const blockTree = ref<SindriComponent[] | null>(null)

const parseBlockTree = () => {
  if (!markdownContent.value) {
    blockTree.value = []
    return
  }
  const tokens = marked.lexer(markdownContent.value).filter((token) => token.type === 'code' && token.lang.split(':')[0] === 'sindri')

  if (!blockTree.value || tokens.length !== blockTree.value.length) blockTree.value = tokens.map((token, idx) => {
    const [sindri, category, block] = token.lang.split(':')

    return {
      name: token.lang,
      index: idx,
      sindri: sindri,
      category: category,
      block: block,
      config: YAML.parse(token.text)
    } as SindriComponent
  })
}

watch(markdownContent, parseBlockTree)

let autoSaveMarkdownContent: number | undefined

const reorderBlock = (idx: number, direction: 'up' | 'down') => {
  if (!blockTree.value) return

  const newBlockTree = [...blockTree.value]
  const [reorderedBlock] = newBlockTree.splice(idx, 1)
  newBlockTree.splice(direction === 'up' ? idx - 1 : idx + 1, 0, reorderedBlock)
  blockTree.value = newBlockTree

  reloadMarkdownFromBlockTree()
}

const reloadMarkdownFromBlockTree = () => {
  if (!blockTree.value) return

  const newMarkdown = blockTree.value.map((block) => {
    const yamlString = YAML.stringify(block.config)
    return `\`\`\`sindri:${block.category}:${block.block}\n${yamlString}\n\`\`\``
  }).join('\n')

  if (markdownContent.value !== newMarkdown) {
    markdownContentModified = Date.now()
    emit('markdownUpdated')
  }
  markdownContent.value = newMarkdown
}

/* const convertHTMLtoMarkdown = () => {
  nextTick(() => {
    markdownContent.value = turndownService.turndown(htmlContent.value)
    emit('htmlToMarkdownConverted')
  })
}*/

function handleSindriComponentUpdate() {
  console.log('handleSindriComponentUpdate', currentSindriComponent.value)

  if (!currentSindriComponent.value || !currentSindriComponent.value.node) {
    console.log('No hay componente seleccionado', currentSindriComponent)
  }

  reloadMarkdownFromBlockTree()

  /*const parsedYAML = YAML.stringify(toRaw(currentSindriComponent.value.config))

  currentSindriComponent.value.node.el.innerHTML = parsedYAML
  htmlContent.value = currentSindriComponent.value.node.doc.body.innerHTML
  convertHTMLtoMarkdown()*/
}

/*function handleSelectionChange(e) {
  console.log(e)
  if (!e.range) return

  currentParentNodeSelected = getParentBlock(htmlContent.value, e.range.index)
  console.log('Parent node', currentParentNodeSelected)

  const sindriNode = getParentCodeBlock(htmlContent.value, e.range.index)
  console.log('Sindri node', sindriNode)
  if (!sindriNode) {
    currentSindriComponent.value = null
    return null
  }
  console.log('Sindri class', sindriNode.el.className)

  const sindriComponentName = sindriNode.el.className.split('-')[1] ?? 'null'
  if (!sindriComponentName) {
    currentSindriComponent.value = null
    return null
  }
  console.log('Sindri component name', sindriComponentName)

  currentSindriComponent.value = {
    name: sindriComponentName,
    node: sindriNode,
    config: YAML.parse(sindriNode.el.innerHTML)
  }
  return true
}*/

const HandleAddSindriBlock = (e) => {
  //if (!currentParentNodeSelected) return

  const { category, block } = (e as CustomEvent).detail
  console.log('Category, Block', category, block)

  sindriComponentToAdd =
    SindriMarketingBlockFactory(category, block) ?? SindriUIBlockFactory(category, block)

  const newBlockToTree: SindriComponent = {
    name: 'sindri:' + category + ':' + block,
    index: blockTree.length,
    sindri: 'sindri',
    category: category,
    block: block,
    config: sindriComponentToAdd as object
  } as SindriComponent

  if (currentSindriComponent.value) {
    const newBlockTree = [...blockTree.value]
    newBlockTree.splice(currentSindriComponent.value.index + 1, 0, newBlockToTree)
    blockTree.value = newBlockTree
  } else {
    if (!blockTree.value) blockTree.value = []
    blockTree.value.push(newBlockToTree)
  }
  reloadMarkdownFromBlockTree()

  /*const sindriCamponentNodeToAdd: Node = document.createElement('pre')
  const sindriCamponentNodeCodeToAdd: Node = document.createElement('code')
  sindriCamponentNodeCodeToAdd.className = 'language-sindri:' + category + ':' + block
  sindriCamponentNodeCodeToAdd.innerHTML = YAML.stringify(toRaw(sindriComponentToAdd))
  sindriCamponentNodeToAdd.appendChild(sindriCamponentNodeCodeToAdd)

  currentParentNodeSelected.doc.body.insertBefore(
    sindriCamponentNodeToAdd,
    currentParentNodeSelected.el.nextSibling
  )

  htmlContent.value = currentParentNodeSelected.doc.body.innerHTML
  convertHTMLtoMarkdown()*/
}

onMounted(() => {
  window.addEventListener('add-sindri-block', HandleAddSindriBlock as EventListener)

  autoSaveMarkdownContent = window.setInterval(() => {
    if (markdownContentModified && markdownContentModified < Date.now() - markdownContentMilisecondsToAutosave) {
      console.log('Auto save markdown content')
      markdownContentModified = null
      window.dispatchEvent(new CustomEvent('sindri-save-file'))
    }
  }, markdownContentMilisecondsToAutosave)
})

onUnmounted(() => {
  window.removeEventListener('add-sindri-block', HandleAddSindriBlock as EventListener)

  clearInterval(autoSaveMarkdownContent)
})
</script>
