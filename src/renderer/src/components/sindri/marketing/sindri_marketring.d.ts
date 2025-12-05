export {} // ensure this file is a module

declare global {
  /*With Quill interface SindriComponent {
    name: string
    node: {
      el: Node
      doc: Document
    }
    config: object
  }*/
  interface SindriComponent {
    name: string
    index: number
    sindri: string
    category: string
    block: string
    config: object
  }

  // sindri:marketing:banners
  interface SindriMarketingBanners {
    title: string
    titleStrong?: {
      description: string
      variant?: string
    }
    description: string
    actions?: {
      description: string
      href?: string
      variant?: string
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

  // sindri:marketing:blog-cards
  interface SindriMarketingBlogCards {
    items: {
      image: {
        src: string
        alt: string
      }
      category: string
      title: string
      excerpt: string
      href: string
      meta?: string
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
  }

  // sindri:marketing:product-cards
  interface SindriMarketingProductCards {
    items: {
      image: {
        src: string
        alt: string
      }
      title: string
      price: string
      rating: number
      action?: {
        description: string
        variant?: string
      }
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
  }

  // sindri:marketing:product-collections
  interface SindriMarketingProductCollections {
    items: {
      image: {
        src: string
        alt: string
      }
      title: string
      count: number
      href: string
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
  }

  // sindri:marketing:carts
  interface SindriMarketingCarts {
    items: {
      image: {
        src: string
        alt: string
      }
      title: string
      variant?: string
      qty: number
      price: number
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
    subtotal: number
    shipping: number
    tax: number
    total: number
    actions?: {
      description: string
      variant?: string
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

  // sindri:marketing:team-sections
  interface SindriMarketingTeamSections {
    title: string
    description?: string
    items: {
      name: string
      role: string
      image: {
        src: string
        alt: string
      }
      links?: {
        label: string
        href: string
      }[]
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

  // sindri:marketing:cards
  interface SindriMarketingCards {
    title: string
    description?: string
    items: {
      icon?: string | { svg: string }
      title: string
      description: string
      href?: string
      linkText?: string
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

  // sindri:marketing:newsletter-signup
  interface SindriMarketingNewsletterSignup {
    title: string
    description?: string
    placeholder: string
    button: {
      description: string
      variant?: string
      htmltag?: {
        class?: string
        style?: string
      }
    }
    htmltag?: {
      class?: string
      style?: string
    }
  }

  // sindri:marketing:contact-form
  interface SindriMarketingContactForm {
    title: string
    description?: string
    name: {
      label: string
      placehoder: string // note: as in source
      htmltag?: {
        class?: string
        style?: string
      }
    }
    email: {
      label: string
      placehoder: string
      htmltag?: {
        class?: string
        style?: string
      }
    }
    message: {
      label: string
      placehoder: string
      htmltag?: {
        class?: string
        style?: string
      }
    }
    button: {
      description: string
      variant?: string
      htmltag?: {
        class?: string
        style?: string
      }
    }
    htmltag?: {
      class?: string
      style?: string
    }
  }

  // sindri:marketing:ctas
  interface SindriMarketingCtas {
    title: string
    description?: string
    image: {
      src: string
      alt: string
    }
    actions?: {
      description: string
      href?: string
      variant?: string
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

  // sindri:marketing:logo-clouds
  interface SindriMarketingLogoClouds {
    items: {
      src: string
      alt: string
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
  }

  // sindri:marketing:headers
  interface SindriMarketingHeaders {
    brand: {
      text: string
      href: string
      htmltag?: {
        class?: string
        style?: string
      }
    }
    nav: {
      items: {
        title: string
        href: string
        htmltag?: {
          class?: string
          style?: string
        }
      }[]
    }
    actions?: {
      description: string
      href?: string
      variant?: string
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
  }

  // sindri:marketing:footers
  interface SindriMarketingFooters {
    newsletter?: {
      title: string
      description?: string
      placeholder: string
      button: {
        description: string
        href?: string
        variant?: string
      }
      htmltag?: {
        class?: string
        style?: string
      }
    }
    columns: {
      title: string
      links: {
        title: string
        href: string
      }[]
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
  }

  // sindri:marketing:announcements
  interface SindriMarketingAnnouncements {
    items: {
      title: string
      description: string
      variant?: string
      action?: {
        description: string
        variant?: string
      }
      htmltag?: {
        class?: string
        style?: string
      }
    }[]
  }

  // sindri:marketing:sections
  interface SindriMarketingSections {
    title: string
    description?: string
    image?: {
      src: string
      alt: string
    }
    actions?: {
      description: string
      variant?: string
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

  // sindri:marketing:empty-content
  interface SindriMarketingEmptyContent {
    icon?: string
    title: string
    description?: string
    actions?: {
      description: string
      variant?: string
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

  // sindri:marketing:faqs
  interface SindriMarketingFaqs {
    title: string
    description?: string
    items: {
      question: string
      answer: string
    }[]
    htmltag?: {
      class?: string
      style?: string
    }
  }

  // sindri:marketing:polls
  interface SindriMarketingPolls {
    question: string
    name: string
    options: {
      id: string
      label: string
      value: string
    }[]
    action: {
      description: string
      variant?: string
    }
    htmltag?: {
      class?: string
      style?: string
    }
  }

  // sindri:marketing:stats
  interface SindriMarketingStats {
    title: string
    description?: string
    items: {
      value: string
      label: string
    }[]
    htmltag?: {
      class?: string
      style?: string
    }
  }

  // sindri:marketing:pricing
  interface SindriMarketingPricing {
    title: string
    description?: string
    plans: {
      name: string
      price: string
      description?: string
      popular?: boolean
      features?: string[]
      action?: {
        description: string
        variant?: string
      }
    }[]
    htmltag?: {
      class?: string
      style?: string
    }
  }

  // sindri:marketing:feature-grids
  interface SindriMarketingFeatureGrids {
    title: string
    description?: string
    items: {
      icon?: string | { svg: string }
      title: string
      description: string
    }[]
    htmltag?: {
      class?: string
      style?: string
    }
  }

  // sindri:marketing:feature
  interface SindriMarketingFeature {
    items: {
      title: string
      description: string
    }[]
    htmltag?: {
      class?: string
      style?: string
    }
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
    htmltag?: {
      class?: string
      style?: string
    }
  }
}
