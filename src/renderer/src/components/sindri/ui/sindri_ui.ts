export {} // ensure this file is a module

type SindriUIUnion =
  | SindriUIBreadcrumbs
  | SindriUITabs
  | SindriUIPagination
  | SindriUIProgressBars
  | SindriUILoaders
  | SindriUISteps
  | SindriUISideMenu
  | SindriUIVerticalMenu
  | SindriUISkipLinks
  | SindriUIStats
  | SindriUITables
  | SindriUITimelines
  | SindriUIToasts
  | SindriUIMedia
  | SindriUIAccordions
  | SindriUIRangeInputs
  | SindriUITextareas
  | SindriUICheckboxes
  | SindriUIRadioGroups
  | SindriUISelects
  | SindriUIToggles
  | SindriUICard
  | SindriUIInputs
  | SindriUIQuantityInputs
  | SindriUIBadges
  | SindriUIButtonGroups
  | SindriUIDetailsList
  | SindriUIDividers
  | SindriUIEmptyStates
  | SindriUIDropdown
  | SindriUIFileUploaders
  | SindriUIFilters
  | SindriUIGrids

export function SindriUIBlockFactory(
  category: 'ui',
  block: string
): SindriUIUnion | null {
  if (category !== 'ui') return null

  switch (block) {
    case 'breadcrumbs':
      return <SindriUIBreadcrumbs>{
        items: [
          { title: 'Lorem ipsum', href: '#', htmltag: { class: '', style: '' } },
          { title: 'Dolor sit', href: '#' },
        ],
      }

    case 'tabs':
      return <SindriUITabs>{
        items: [
          { title: 'Lorem', selected: true, content: 'Lorem ipsum dolor sit amet.', htmltag: { class: '', style: '' } },
          { title: 'Ipsum', content: 'Consectetur adipiscing elit.' },
        ],
      }

    case 'pagination':
      return <SindriUIPagination>{
        total: 10,
        current: 1,
        hrefBase: '#page=',
        htmltag: { class: '', style: '' },
      }

    case 'progress-bars':
      return <SindriUIProgressBars>{
        items: [
          { title: 'Progreso', value: 40, max: 100, caption: '40%', colorClass: 'primary', htmltag: { class: '', style: '' } },
          { title: 'Carga', value: 70, max: 100 },
        ],
      }

    case 'loaders':
      return <SindriUILoaders>{
        items: [
          { type: 'spinner', size: 24, colorClass: 'primary', title: 'Cargando', htmltag: { class: '', style: '' } },
          { type: 'dots', size: 18, colorClass: 'neutral', title: 'Procesando' },
        ],
      }

    case 'steps':
      return <SindriUISteps>{
        items: [
          { title: 'Paso 1', description: 'Lorem ipsum', status: 'current', htmltag: { class: '', style: '' } },
          { title: 'Paso 2', description: 'Dolor sit', status: 'upcoming' },
        ],
      }

    case 'side-menu':
      return <SindriUISideMenu>{
        title: 'Menú lateral',
        items: [
          { title: 'Inicio', href: '#', active: true, htmltag: { class: '', style: '' } },
          { title: 'Perfil', href: '#' },
        ],
        content: 'Lorem ipsum dolor sit amet.',
        htmltag: { class: '', style: '' },
      }

    case 'vertical-menu':
      return <SindriUIVerticalMenu>{
        title: 'Menú',
        items: [
          { title: 'Elemento 1', href: '#', active: true, htmltag: { class: '', style: '' } },
          { title: 'Elemento 2', href: '#' },
        ],
        htmltag: { class: '', style: '' },
      }

    case 'skip-links':
      return <SindriUISkipLinks>{
        items: [
          { title: 'Saltar al contenido', href: '#content', htmltag: { class: '', style: '' } },
          { title: 'Saltar al menú', href: '#menu' },
        ],
      }

    case 'stats':
      return <SindriUIStats>{
        items: [
          { value: '24k', label: 'Usuarios', htmltag: { class: '', style: '' } },
          { value: '99.9%', label: 'Uptime' },
        ],
      }

    case 'tables':
      return <SindriUITables>{
        columns: ['Nombre', 'Email', 'Rol'],
        rows: [
          ['Jane', 'jane@example.com', 'Admin'],
          ['John', 'john@example.com', 'User'],
        ],
      }

    case 'timelines':
      return <SindriUITimelines>{
        items: [
          { time: '08:00', title: 'Inicio', description: 'Lorem ipsum', htmltag: { class: '', style: '' } },
          { time: '09:30', title: 'Reunión', description: 'Dolor sit amet' },
        ],
      }

    case 'toasts':
      return <SindriUIToasts>{
        items: [
          { variant: 'success', title: 'Hecho', description: 'Operación completada', htmltag: { class: '', style: '' } },
          { variant: 'error', title: 'Error', description: 'Algo salió mal' },
        ],
      }

    case 'media':
      return <SindriUIMedia>{
        items: [
          { src: 'https://picsum.photos/seed/m1/640/360', alt: 'Lorem', title: 'Título', description: 'Descripción', htmltag: { class: '', style: '' } },
          { src: 'https://picsum.photos/seed/m2/640/360', alt: 'Ipsum', title: 'Otro', description: 'Más descripción' },
        ],
      }

    case 'accordions':
      return <SindriUIAccordions>{
        items: [
          { title: 'Pregunta 1', description: 'Respuesta lorem ipsum', open: true, htmltag: { class: '', style: '' } },
          { title: 'Pregunta 2', description: 'Respuesta dolor sit' },
        ],
      }

    case 'range-inputs':
      return <SindriUIRangeInputs>{
        items: [
          { title: 'Volumen', id: 'vol', min: 0, max: 100, value: 50, htmltag: { class: '', style: '' } },
          { title: 'Brillo', id: 'bri', min: 0, max: 100, value: 75 },
        ],
        htmltag: { styles: [{ background: '#eee' }] },
      }

    case 'textareas':
      return <SindriUITextareas>{
        items: [
          { title: 'Comentario', id: 'comment', rows: 4, value: 'Lorem ipsum', htmltag: { class: '', style: '' } },
          { title: 'Notas', id: 'notes', rows: 3, value: 'Dolor sit' },
        ],
        htmltag: { styles: [{ background: '#fafafa' }] },
      }

    case 'checkboxes':
      return <SindriUICheckboxes>{
        legend: 'Opciones',
        items: [
          { id: 'opt1', title: 'Lorem', checked: true, htmltag: { class: '', style: '' } },
          { id: 'opt2', title: 'Ipsum' },
        ],
        htmltag: { class: '', style: '' },
      }

    case 'radio-groups':
      return <SindriUIRadioGroups>{
        legend: 'Selecciona una opción',
        name: 'grupo1',
        items: [
          { id: 'r1', title: 'Lorem', right: 'Recomendado', value: 'lorem', checked: true, htmltag: { class: '', style: '' } },
          { id: 'r2', title: 'Ipsum', value: 'ipsum' },
        ],
        htmltag: { class: '', style: '' },
      }

    case 'selects':
      return <SindriUISelects>{
        items: [
          {
            id: 'sel1',
            title: 'Selecciona',
            placeholder: 'Elige una opción',
            value: '1',
            options: [
              { value: '1', title: 'Uno' },
              { value: '2', title: 'Dos' },
            ],
            htmltag: { class: '', style: '' },
          },
          {
            id: 'sel2',
            title: 'Otra',
            options: [
              { value: 'a', title: 'A' },
              { value: 'b', title: 'B' },
            ],
          },
        ],
      }

    case 'toggles':
      return <SindriUIToggles>{
        items: [
          { id: 't1', checked: true, htmltag: { class: '', style: '' } },
          { id: 't2', checked: false },
        ],
      }

    case 'card':
      return <SindriUICard>{
        title: 'Lorem ipsum',
        content: 'Contenido de ejemplo',
        footer: 'Pie de página',
        variant: 'primary',
        size: 'md',
        as: 'a',
        href: '#',
        htmltag: { class: '', style: '' },
      }

    case 'inputs':
      return <SindriUIInputs>{
        items: [
          { title: 'Nombre', type: 'text', placeholder: 'Tu nombre', description: 'Lorem ipsum', htmltag: { class: '', style: '' } },
          { title: 'Email', type: 'email', placeholder: 'email@ejemplo.com' },
        ],
        htmltag: { class: '', style: '' },
      }

    case 'quantity-inputs':
      return <SindriUIQuantityInputs>{
        items: [
          { title: 'Cantidad', value: 1, min: 1, max: 10, htmltag: { class: '', style: '' } },
          { title: 'Unidades', value: 2, min: 0, max: 5 },
        ],
        htmltag: { class: '', style: '' },
      }

    case 'badges':
      return <SindriUIBadges>{
        items: [
          { title: 'Nuevo', htmltag: { class: 'badge-primary', style: '' } },
          { title: 'Destacado' },
        ],
      }

    case 'button-groups':
      return <SindriUIButtonGroups>{
        items: [
          { title: 'Lorem', htmltag: { class: '', style: '' } },
          { title: 'Ipsum' },
        ],
      }

    case 'details-list':
      return <SindriUIDetailsList>{
        items: [
          { title: 'Usuario', description: 'Jane Doe', htmltag: { class: '', style: '' } },
          { title: 'Email', description: 'jane@example.com' },
        ],
      }

    case 'dividers':
      return <SindriUIDividers>{
        title: 'Lorem ipsum',
        htmltag: { class: '', style: '' },
      }

    case 'empty-states':
      return <SindriUIEmptyStates>{
        title: 'Nada por aquí',
        description: 'Lorem ipsum dolor sit amet.',
        action: { title: 'Crear', href: '#', htmltag: { class: '', style: '' } },
        links: [
          { title: 'Ayuda', href: '#', htmltag: { class: '', style: '' } },
          { title: 'Contacto', href: '#' },
        ],
        htmltag: { class: '', style: '' },
      }

    case 'dropdown':
      return <SindriUIDropdown>{
        title: 'Opciones',
        split: true,
        open: false,
        items: [
          { title: 'Acción', href: '#', type: 'link', variant: 'primary', htmltag: { class: '', style: '' } },
          { title: 'Otra acción' },
        ],
      }

    case 'file-uploaders':
      return <SindriUIFileUploaders>{
        title: 'Subir archivo',
        multiple: true,
        htmltag: { class: '', style: '' },
      }

    case 'filters':
      return <SindriUIFilters>{
        items: [
          { title: 'Categorías', type: 'checkbox', options: [{ title: 'Lorem', checked: true }, { title: 'Ipsum' }], htmltag: { class: '', style: '' } },
          { title: 'Precio', type: 'range', min: 0, max: 100 },
        ],
      }

    case 'grids':
      return <SindriUIGrids>{
        cols: 3,
        gap: 16,
        items: [
          { content: 'Lorem', htmltag: { class: '', style: '' } },
          { content: 'Ipsum' },
          { content: 'Dolor' },
        ],
      }

    default:
      return null
  }
}
