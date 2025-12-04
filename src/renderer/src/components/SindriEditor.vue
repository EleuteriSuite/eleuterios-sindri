<template>
  <div class="text-sm font-medium text-gray-700 mt-3">
    File: <span v-html="filePath" />.
  </div>
  <div class="text-sm font-medium text-gray-700 my-3">
    State: <span v-if="fileSaved">Saved</span><span v-else>To save...</span>
  </div>
  <QuillEditor
    theme="snow"
    class="mt-3 min-h-[40vh] max-h-[40vh] overflow-y-auto"
    v-model:content="htmlContent"
    contentType="html"
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
import { nextTick, ref, toRaw } from 'vue'
import { SindriComponent } from '@renderer/components/sindri/marketing/sindri_marketring'
import YAML from 'yaml'
import { getParentCodeBlock } from '@renderer/utils/quill'
import TurndownService from 'turndown'

const emit = defineEmits(['htmlToMarkdownConverted'])

// Sindri component
const currentSindriComponent = ref<SindriComponent | null>(null)

const { filePath, fileSaved } = defineProps(['filePath', 'fileSaved'])

// Editor content
const htmlContent = defineModel('htmlContent', { type: String, required: true })
const markdownContent = defineModel('markdownContent', { type: String, required: true })

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
</script>
