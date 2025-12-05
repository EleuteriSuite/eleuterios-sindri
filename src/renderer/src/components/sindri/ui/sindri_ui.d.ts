export {} // ensure this file is a module

declare global {

  interface SindriUIBreadcrumbs {
    items: {
      title: string
      href: string
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
  }

  // sindri:ui:tabs
  interface SindriUITabs {
    items: {
      title: string
      selected?: boolean
      content: string
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
  }

  // sindri:ui:pagination
  interface SindriUIPagination {
    total: number
    current: number
    hrefBase: string
    htmltag?: {
      class?: string
      style?: string
    }
  }

  // sindri:ui:progress-bars
  interface SindriUIProgressBars {
    items: {
      title: string
      value: number
      max: number
      caption?: string
      colorClass?: string
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
  }

  // sindri:ui:loaders
  interface SindriUILoaders {
    items: {
      type: string
      size: number
      colorClass: string
      title: string
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
  }

  // sindri:ui:steps
  interface SindriUISteps {
    items: {
      title: string
      description: string
      status: string
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
  }

  // sindri:ui:side-menu
  interface SindriUISideMenu {
    title: string
    items: {
      title: string
      href: string
      active?: boolean
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
    content: string
    htmltag?: {
      class?: string
      style?: string
    }
  }

  // sindri:ui:vertical-menu
  interface SindriUIVerticalMenu {
    title: string
    items: {
      title: string
      href: string
      active?: boolean
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
    htmltag?: {
      class?: string
      style?: string
    }
  }

  // sindri:ui:skip-links
  interface SindriUISkipLinks {
    items: {
      title: string
      href: string
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
  }

  // sindri:ui:stats
  interface SindriUIStats {
    items: {
      value: string
      label: string
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
  }

  // sindri:ui:tables
  interface SindriUITables {
    columns: string[]
    rows: string[][]
  }

  // sindri:ui:timelines
  interface SindriUITimelines {
    items: {
      time: string
      title: string
      description: string
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
  }

  // sindri:ui:toasts
  interface SindriUIToasts {
    items: {
      variant: string
      title: string
      description: string
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
  }

  // sindri:ui:media
  interface SindriUIMedia {
    items: {
      src: string
      alt: string
      title: string
      description: string
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
  }

  // sindri:ui:accordions
  interface SindriUIAccordions {
    items: {
      title: string
      description: string
      open?: boolean
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
  }

  // sindri:ui:range-inputs
  interface SindriUIRangeInputs {
    items: {
      title: string
      id: string
      min: number
      max: number
      value: number
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
    htmltag?: {
      styles?: {
        background?: string
      }[]
    }
  }

  // sindri:ui:textareas
  interface SindriUITextareas {
    items: {
      title: string
      id: string
      rows: number
      value: string
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
    htmltag?: {
      styles?: {
        background?: string
      }[]
    }
  }

  // sindri:ui:checkboxes
  interface SindriUICheckboxes {
    legend: string
    items: {
      id: string
      title: string
      checked?: boolean
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
    htmltag?: {
      class?: string
      style?: string
    }
  }

  // sindri:ui:radio-groups
  interface SindriUIRadioGroups {
    legend: string
    name: string
    items: {
      id: string
      title: string
      right?: string
      value: string
      checked?: boolean
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
    htmltag?: {
      class?: string
      style?: string
    }
  }

  // sindri:ui:selects
  interface SindriUISelects {
    items: {
      id: string
      title: string
      placeholder?: string
      value?: string
      options: {
        value: string
        title: string
      }[]
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
  }

  // sindri:ui:toggles
  interface SindriUIToggles {
    items: {
      id: string
      checked?: boolean
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
  }

  // sindri:ui:card
  interface SindriUICard {
    title: string
    content: string
    footer?: string
    variant?: string
    size?: string
    as?: string
    href?: string
    htmltag?: {
      class?: string
      style?: string
    }
  }

  // sindri:ui:inputs
  interface SindriUIInputs {
    items: {
      title: string
      type: string
      placeholder?: string
      description?: string
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
    htmltag?: {
      class?: string
      style?: string
    }
  }

  // sindri:ui:quantity-inputs
  interface SindriUIQuantityInputs {
    items: {
      title: string
      value: number
      min: number
      max: number
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
    htmltag?: {
      class?: string
      style?: string
    }
  }

  // sindri:ui:badges
  interface SindriUIBadges {
    items: {
      title: string
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
  }

  // sindri:ui:button-groups
  interface SindriUIButtonGroups {
    items: {
      title: string
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
  }

  // sindri:ui:details-list
  interface SindriUIDetailsList {
    items: {
      title: string
      description: string
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
  }

  // sindri:ui:dividers
  interface SindriUIDividers {
    title: string
    htmltag?: {
      class?: string
      style?: string
    }
  }

  // sindri:ui:empty-states
  interface SindriUIEmptyStates {
    title: string
    description: string
    action: {
      title: string
      href: string
      htmltag?: {
        class?: string
        style?: string
      }
    }
    links: {
      title: string
      href: string
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
    htmltag?: {
      class?: string
      style?: string
    }
  }

  // sindri:ui:dropdown
  interface SindriUIDropdown {
    title: string
    split?: boolean
    open?: boolean
    items: {
      title: string
      href?: string
      type?: string
      variant?: string
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
  }

  // sindri:ui:file-uploaders
  interface SindriUIFileUploaders {
    title: string
    multiple?: boolean
    htmltag?: {
      class?: string
      style?: string
    }
  }

  // sindri:ui:filters
  interface SindriUIFilters {
    items: ({
      title: string
      type: string
      options?: {
        title: string
        checked?: boolean
      }[]
      min?: number
      max?: number
      htmltag?: {
        class?: string
        style?: string
      }
    })[]
  }

  // sindri:ui:grids
  interface SindriUIGrids {
    cols: number
    gap: number
    items: {
      content: string
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
  }
}
