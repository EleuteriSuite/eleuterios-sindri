<template>
  <div class="text-sm font-medium text-gray-700 mt-3">File: <span v-html="filePath" />.</div>
  <div class="text-sm font-medium text-gray-700 my-3">
    State: <span v-if="fileSaved">Saved</span><span v-else>To save...</span>
  </div>
  <QuillEditor
    theme="snow"
    class="mt-3 min-h-[40vh] max-h-[40vh] overflow-y-auto"
    v-model:content="htmlContent"
    contentType="html"
    :toolbar="toolbarOptions"
    @update:content="convertHTMLtoMarkdown"
    @selectionChange="handleSelectionChange"
  />
  <div class="h-[40vh]">
    <SindriMarketingHero
      v-if="currentSindriComponent && currentSindriComponent.name === 'sindri:marketing:hero'"
      v-model="currentSindriComponent.config"
      @change="handleSindriComponentUpdate"
    />
  </div>
</template>
<script setup lang="ts">
import SindriMarketingHero from '@renderer/components/sindri/marketing/SindriMarketingHero.vue'
import { QuillEditor } from '@vueup/vue-quill'
import { nextTick, onMounted, onUnmounted, ref, toRaw } from 'vue'
import {
  SindriBlockFactory,
  SindriComponent
} from '@renderer/components/sindri/marketing/sindri_marketring'
import YAML from 'yaml'
import { getParentBlock, getParentCodeBlock } from '@renderer/utils/quill'
import TurndownService from 'turndown'

const emit = defineEmits(['htmlToMarkdownConverted'])

// Sindri component
const currentSindriComponent = ref<SindriComponent | null>(null)

const { filePath, fileSaved } = defineProps(['filePath', 'fileSaved'])

// Editor content
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote'],
  ['link'],
  // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

  [{ header: [1, 2, 3, 4, 5, 6, false] }]
]
const htmlContent = defineModel('htmlContent', { type: String, required: true })
const markdownContent = defineModel('markdownContent', { type: String, required: true })
let currentParentNodeSelected: Node | null = null
let sindriComponentToAdd: object | null = null

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
})

const convertHTMLtoMarkdown = () => {
  nextTick(() => {
    markdownContent.value = turndownService.turndown(htmlContent.value)
    emit('htmlToMarkdownConverted')
  })
}

function handleSindriComponentUpdate() {
  console.log('handleSindriComponentUpdate', currentSindriComponent.value)

  if (!currentSindriComponent.value || !currentSindriComponent.value.node) {
    console.log('No hay componente seleccionado', currentSindriComponent)
  }

  const parsedYAML = YAML.stringify(toRaw(currentSindriComponent.value.config))

  currentSindriComponent.value.node.el.innerHTML = parsedYAML
  htmlContent.value = currentSindriComponent.value.node.doc.body.innerHTML
  convertHTMLtoMarkdown()
}

function handleSelectionChange(e) {
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
}

const HandleAddSindriBlock = (e) => {
  if (!currentParentNodeSelected) return

  const { category, block } = (e as CustomEvent).detail
  console.log('Category, Block', category, block)

  sindriComponentToAdd = SindriBlockFactory(category, block)

  const sindriCamponentNodeToAdd: Node = document.createElement('pre')
  const sindriCamponentNodeCodeToAdd: Node = document.createElement('code')
  sindriCamponentNodeCodeToAdd.className = 'language-sindri:' + category + ':' + block
  sindriCamponentNodeCodeToAdd.innerHTML = YAML.stringify(toRaw(sindriComponentToAdd))
  sindriCamponentNodeToAdd.appendChild(sindriCamponentNodeCodeToAdd)

  currentParentNodeSelected.doc.body.insertBefore(sindriCamponentNodeToAdd, currentParentNodeSelected.el.nextSibling);

  htmlContent.value = currentParentNodeSelected.doc.body.innerHTML
  convertHTMLtoMarkdown()
}

onMounted(() => {
  window.addEventListener('add-sindri-block', HandleAddSindriBlock as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('add-sindri-block', HandleAddSindriBlock as EventListener)
})
</script>
