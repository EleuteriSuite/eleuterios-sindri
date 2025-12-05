export {} // ensure this file is a module

declare global {

  interface SindriUIBreadcrumbs {
    items: [
      {
        title: string
        href: string
      }
    ]
  }
}
