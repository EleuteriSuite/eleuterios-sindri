export {} // ensure this file is a module

declare global {
  interface SindriComponent {
    name: string
    node: {
      el: Node
      doc: Document
    }
    config: object
  }

  interface SindriMarketingHero {
    title: {
      description: string
    }
    subtitle: {
      description: string
    }
    action: {
      description: string
      variant: string
      size: string
      as: string
      href: string
    }
    htmltag: {
      class: string
      style: string
    }
  }
}
