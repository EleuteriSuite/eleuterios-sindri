<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-bold">Sindri Marketing Config</h1>

    <!-- Root renderer: renders any marketing block config -->
    <div class="space-y-3">
      <FieldRenderer v-for="(value, key) in config"
                     :key="String(key)"
                     :label="formatLabel(String(key))"
                     v-model:value="config[key as keyof typeof config]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, h } from 'vue'
import type { VNode } from 'vue'
import SindriInput from '@renderer/components/ui/SindriInput.vue'
import SindriSelect from '@renderer/components/ui/SindriSelect.vue'
import SindriSwitch from '@renderer/components/ui/SindriSwitch.vue'

// Accept any marketing union config
const config = defineModel<Record<string, unknown>>({ required: true })

// Known select options for certain well-known keys
const selectOptions: Record<string, string[]> = {
  variant: ['primary', 'secondary'],
  size: ['sm', 'md', 'lg'],
  as: ['a', 'button', 'div']
}

const isObject = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v)
const isArray = (v: unknown): v is unknown[] => Array.isArray(v)

const formatLabel = (k: string) => k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())

// Local recursive renderer component
const FieldRenderer = defineComponent({
  name: 'FieldRenderer',
  props: {
    label: { type: String, required: false },
    // v-model:value for two-way binding
    value: { type: null as unknown as () => unknown, required: true }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const valueType = computed(() => {
      const v = props.value
      if (isArray(v)) return 'array'
      if (isObject(v)) return 'object'
      return typeof v
    })

    const onPrimitiveUpdate = (val: unknown) => emit('update:value', val)

    const addArrayItem = () => {
      const v = Array.isArray(props.value) ? [...props.value] : [] as unknown[]
      // Heuristic: new object item for arrays of objects, else empty string
      const next = v.length > 0 && isObject(v[0]) ? {} : ''
      v.push(next)
      emit('update:value', v)
    }
    const removeArrayItem = (idx: number) => {
      if (!Array.isArray(props.value)) return
      const v = [...props.value]
      v.splice(idx, 1)
      emit('update:value', v)
    }

    return () => {
      const children: VNode[] = []
      const type = valueType.value

      // Primitive: string
      if (type === 'string') {
        const key = props.label.toLowerCase()
        const opts = (selectOptions as Record<string, string[]>)[key]
        if (opts) {
          children.push(
            h(SindriSelect, {
              label: props.label,
              modelValue: props.value as unknown as string,
              'onUpdate:modelValue': (v: string) => onPrimitiveUpdate(v)
            }, {
              default: () => opts.map(opt => h('option', { value: opt, key: opt }, opt))
            })
          )
        } else {
          children.push(
            h(SindriInput, {
              label: props.label,
              modelValue: props.value as unknown as string,
              'onUpdate:modelValue': (v: string) => onPrimitiveUpdate(v)
            })
          )
        }
      }

      // number
      else if (type === 'number') {
        children.push(
          h(SindriInput, {
            label: props.label,
            type: 'number',
            modelValue: props.value as unknown as number,
            'onUpdate:modelValue': (v: string | number) => onPrimitiveUpdate(Number(v))
          })
        )
      }

      // boolean
      else if (type === 'boolean') {
        children.push(
          h(SindriSwitch, {
            label: props.label,
            modelValue: props.value as unknown as boolean,
            'onUpdate:modelValue': (v: boolean) => onPrimitiveUpdate(v)
          })
        )
      }

      // object
      else if (type === 'object' && isObject(props.value)) {
        let childrenArray: VNode[] = []
        if (props.label) {
          childrenArray.push(h('div', { class: 'text-sm font-semibold text-stone-600' }, props.label))
        }
        childrenArray.push(...Object.entries(props.value as Record<string, unknown>).map(([k, v]) =>
          h(FieldRenderer, {
            key: k,
            label: formatLabel(String(k)),
            value: v,
            'onUpdate:value': (nv: unknown) => {
              const obj = props.value as Record<string, unknown>
              obj[k] = nv
              emit('update:value', { ...obj })
            }
          })
        ))
        children.push(
          h('div', { class: 'rounded border border-stone-200 p-3 space-y-2' }, childrenArray)
        )
      }

      // array
      else if (type === 'array' && Array.isArray(props.value)) {
        const header = h('div', { class: 'flex items-center justify-between' }, [
          h('div', { class: 'text-sm font-semibold text-stone-600' }, props.label),
          h('button', {
            type: 'button',
            class: 'px-2 py-1 text-xs rounded bg-stone-100 hover:bg-stone-200',
            onClick: addArrayItem
          }, '+ Add')
        ])

        const items = (props.value as unknown[]).map((item, idx) =>
          h('div', { class: 'space-y-2 border border-dashed border-stone-300 rounded p-2', key: idx }, [
            h('div', { class: 'flex justify-between items-center' }, [
              h('div', { class: 'text-xs text-stone-500' }, `Item ${idx + 1}`),
              h('button', {
                type: 'button',
                class: 'px-2 py-1 text-xs rounded bg-stone-100 hover:bg-stone-200',
                onClick: () => removeArrayItem(idx)
              }, 'Remove')
            ]),
            isObject(item)
              ? h(FieldRenderer, {
                  label: ``,
                  value: item,
                  'onUpdate:value': (nv: unknown) => {
                    const arr = [...(props.value as unknown[])]
                    arr[idx] = nv
                    emit('update:value', arr)
                  }
                })
              : h(SindriInput, {
                  label: `Item ${idx + 1}`,
                  modelValue: item as unknown as string,
                  'onUpdate:modelValue': (v: string) => {
                    const arr = [...(props.value as unknown[])]
                    arr[idx] = v
                    emit('update:value', arr)
                  }
                })
          ])
        )

        children.push(
          h('div', { class: 'rounded border border-stone-200 p-3 space-y-3' }, [header, ...items])
        )
      }

      return h('div', { class: 'space-y-2' }, children)
    }
  }
})
</script>

<style scoped></style>
