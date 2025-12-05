export {} // ensure this file is a module

type SindriMarketingUnion =
  | SindriMarketingBanners
  | SindriMarketingBlogCards
  | SindriMarketingProductCards
  | SindriMarketingProductCollections
  | SindriMarketingCarts
  | SindriMarketingTeamSections
  | SindriMarketingCards
  | SindriMarketingNewsletterSignup
  | SindriMarketingContactForm
  | SindriMarketingCtas
  | SindriMarketingLogoClouds
  | SindriMarketingHeaders
  | SindriMarketingFooters
  | SindriMarketingAnnouncements
  | SindriMarketingSections
  | SindriMarketingEmptyContent
  | SindriMarketingFaqs
  | SindriMarketingPolls
  | SindriMarketingStats
  | SindriMarketingPricing
  | SindriMarketingFeatureGrids
  | SindriMarketingFeature
  | SindriMarketingHero

export function SindriMarketingBlockFactory(
  category: 'marketing',
  block: string
): SindriMarketingUnion | null {
  if (category !== 'marketing') return null

  switch (block) {
    case 'hero':
      return <SindriMarketingHero>{
        title: { description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        subtitle: { description: 'Sub Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        action: {
          description: 'Lorem ipsum',
          variant: 'primary',
          size: 'sm',
          as: 'a',
          href: '#',
        },
        htmltag: { class: '', style: '' },
      }

    case 'banners':
      return <SindriMarketingBanners>{
        title: 'Lorem ipsum dolor',
        titleStrong: { description: 'sit amet', variant: 'primary' },
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        actions: [
          { description: 'Lorem ipsum', href: '#', variant: 'primary', htmltag: { class: '', style: '' } },
          { description: 'Dolor sit', href: '#', variant: 'secondary' },
        ],
        htmltag: { class: '', style: '' },
      }

    case 'blog-cards':
      return <SindriMarketingBlogCards>{
        items: [
          {
            image: { src: 'https://picsum.photos/seed/1/640/360', alt: 'Lorem' },
            category: 'Lorem',
            title: 'Lorem ipsum dolor sit',
            excerpt: 'Consectetur adipiscing elit sed do eiusmod tempor.',
            href: '#',
            meta: '5 min read',
            htmltag: { class: '', style: '' },
          },
          {
            image: { src: 'https://picsum.photos/seed/2/640/360', alt: 'Ipsum' },
            category: 'Ipsum',
            title: 'Ut enim ad minim veniam',
            excerpt: 'Quis nostrud exercitation ullamco laboris nisi.',
            href: '#',
          },
        ],
      }

    case 'product-cards':
      return <SindriMarketingProductCards>{
        items: [
          {
            image: { src: 'https://picsum.photos/seed/p1/400/400', alt: 'Product' },
            title: 'Lorem Product',
            price: '$19.99',
            rating: 4.5,
            action: { description: 'Buy now', variant: 'primary' },
            htmltag: { class: '', style: '' },
          },
          {
            image: { src: 'https://picsum.photos/seed/p2/400/400', alt: 'Product' },
            title: 'Ipsum Product',
            price: '$29.99',
            rating: 4,
          },
        ],
      }

    case 'product-collections':
      return <SindriMarketingProductCollections>{
        items: [
          {
            image: { src: 'https://picsum.photos/seed/c1/640/360', alt: 'Collection' },
            title: 'Summer Lorem',
            count: 12,
            href: '#',
            htmltag: { class: '', style: '' },
          },
          {
            image: { src: 'https://picsum.photos/seed/c2/640/360', alt: 'Collection' },
            title: 'Winter Ipsum',
            count: 8,
            href: '#',
          },
        ],
      }

    case 'carts':
      return <SindriMarketingCarts>{
        items: [
          {
            image: { src: 'https://picsum.photos/seed/cart1/80/80', alt: 'Item' },
            title: 'Lorem Item',
            variant: 'Default',
            qty: 1,
            price: 19.99,
            htmltag: { class: '', style: '' },
          },
          {
            image: { src: 'https://picsum.photos/seed/cart2/80/80', alt: 'Item' },
            title: 'Ipsum Item',
            qty: 2,
            price: 9.99,
          },
        ],
        subtotal: 39.97,
        shipping: 5.0,
        tax: 3.2,
        total: 48.17,
        actions: [
          { description: 'Checkout', variant: 'primary', htmltag: { class: '', style: '' } },
        ],
        htmltag: { class: '', style: '' },
      }

    case 'team-sections':
      return <SindriMarketingTeamSections>{
        title: 'Nuestro equipo',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        items: [
          {
            name: 'Jane Doe',
            role: 'CEO',
            image: { src: 'https://picsum.photos/seed/u1/256/256', alt: 'Jane' },
            links: [
              { label: 'Twitter', href: '#' },
              { label: 'LinkedIn', href: '#' },
            ],
            htmltag: { class: '', style: '' },
          },
          {
            name: 'John Smith',
            role: 'CTO',
            image: { src: 'https://picsum.photos/seed/u2/256/256', alt: 'John' },
          },
        ],
        htmltag: { class: '', style: '' },
      }

    case 'cards':
      return <SindriMarketingCards>{
        title: 'Lorem ipsum',
        description: 'Consectetur adipiscing elit.',
        items: [
          {
            icon: '⭐',
            title: 'Feature one',
            description: 'Lorem ipsum dolor sit amet.',
            href: '#',
            linkText: 'Learn more',
            htmltag: { class: '', style: '' },
          },
          {
            icon: { svg: '<svg></svg>' },
            title: 'Feature two',
            description: 'Sed do eiusmod tempor incididunt.',
          },
        ],
        htmltag: { class: '', style: '' },
      }

    case 'newsletter-signup':
      return <SindriMarketingNewsletterSignup>{
        title: 'Suscríbete',
        description: 'Lorem ipsum dolor sit amet.',
        placeholder: 'email@ejemplo.com',
        button: {
          description: 'Enviar',
          variant: 'primary',
          htmltag: { class: '', style: '' },
        },
        htmltag: { class: '', style: '' },
      }

    case 'contact-form':
      return <SindriMarketingContactForm>{
        title: 'Contacto',
        description: 'Lorem ipsum dolor sit amet.',
        name: { label: 'Nombre', placehoder: 'Tu nombre', htmltag: { class: '', style: '' } },
        email: { label: 'Email', placehoder: 'tu@email.com', htmltag: { class: '', style: '' } },
        message: { label: 'Mensaje', placehoder: 'Escribe tu mensaje', htmltag: { class: '', style: '' } },
        button: { description: 'Enviar', variant: 'primary', htmltag: { class: '', style: '' } },
        htmltag: { class: '', style: '' },
      }

    case 'ctas':
      return <SindriMarketingCtas>{
        title: 'Actúa ahora',
        description: 'Lorem ipsum dolor sit amet.',
        image: { src: 'https://picsum.photos/seed/cta/800/400', alt: 'CTA' },
        actions: [
          { description: 'Comenzar', href: '#', variant: 'primary', htmltag: { class: '', style: '' } },
        ],
        htmltag: { class: '', style: '' },
      }

    case 'logo-clouds':
      return <SindriMarketingLogoClouds>{
        items: [
          { src: 'https://via.placeholder.co/120x60?text=A', alt: 'Logo A', htmltag: { class: '', style: '' } },
          { src: 'https://via.placeholder.co/120x60?text=B', alt: 'Logo B' },
          { src: 'https://via.placeholder.co/120x60?text=C', alt: 'Logo C' },
        ],
      }

    case 'headers':
      return <SindriMarketingHeaders>{
        brand: { text: 'Lorem', href: '#', htmltag: { class: '', style: '' } },
        nav: {
          items: [
            { title: 'Inicio', href: '#', htmltag: { class: '', style: '' } },
            { title: 'Productos', href: '#' },
            { title: 'Contacto', href: '#' },
          ],
        },
        actions: [
          { description: 'Entrar', href: '#', variant: 'link', htmltag: { class: '', style: '' } },
          { description: 'Registrar', href: '#', variant: 'primary' },
        ],
      }

    case 'footers':
      return <SindriMarketingFooters>{
        newsletter: {
          title: 'Recibe novedades',
          description: 'Lorem ipsum dolor sit amet.',
          placeholder: 'tu@email.com',
          button: { description: 'Suscribir', href: '#', variant: 'primary' },
          htmltag: { class: '', style: '' },
        },
        columns: [
          {
            title: 'Empresa',
            links: [
              { title: 'Sobre nosotros', href: '#' },
              { title: 'Carreras', href: '#' },
            ],
            htmltag: { class: '', style: '' },
          },
          {
            title: 'Soporte',
            links: [
              { title: 'Ayuda', href: '#' },
              { title: 'Contacto', href: '#' },
            ],
          },
        ],
      }

    case 'announcements':
      return <SindriMarketingAnnouncements>{
        items: [
          {
            title: 'Nueva característica',
            description: 'Lorem ipsum dolor sit amet.',
            variant: 'info',
            action: { description: 'Ver más', variant: 'link' },
            htmltag: { class: '', style: '' },
          },
          {
            title: 'Actualización',
            description: 'Consectetur adipiscing elit.',
          },
        ],
      }

    case 'sections':
      return <SindriMarketingSections>{
        title: 'Sección destacada',
        description: 'Lorem ipsum dolor sit amet.',
        image: { src: 'https://picsum.photos/seed/section/800/400', alt: 'Sección' },
        actions: [
          { description: 'Acción', variant: 'primary', htmltag: { class: '', style: '' } },
        ],
        htmltag: { class: '', style: '' },
      }

    case 'empty-content':
      return <SindriMarketingEmptyContent>{
        icon: '📦',
        title: 'Sin contenido',
        description: 'Lorem ipsum dolor sit amet.',
        actions: [
          { description: 'Crear', variant: 'primary', htmltag: { class: '', style: '' } },
        ],
        htmltag: { class: '', style: '' },
      }

    case 'faqs':
      return <SindriMarketingFaqs>{
        title: 'Preguntas frecuentes',
        description: 'Lorem ipsum dolor sit amet.',
        items: [
          { question: '¿Qué es Lorem ipsum?', answer: 'Es un texto de marcador.' },
          { question: '¿Por qué lo usamos?', answer: 'Para maquetación y ejemplos.' },
        ],
        htmltag: { class: '', style: '' },
      }

    case 'polls':
      return <SindriMarketingPolls>{
        question: '¿Te gusta Lorem ipsum?',
        name: 'encuesta_lorem',
        options: [
          { id: 'si', label: 'Sí', value: 'yes' },
          { id: 'no', label: 'No', value: 'no' },
        ],
        action: { description: 'Votar', variant: 'primary' },
        htmltag: { class: '', style: '' },
      }

    case 'stats':
      return <SindriMarketingStats>{
        title: 'Nuestras cifras',
        description: 'Lorem ipsum dolor sit amet.',
        items: [
          { value: '24k', label: 'Usuarios' },
          { value: '99.9%', label: 'Uptime' },
          { value: '4.8/5', label: 'Valoración' },
        ],
        htmltag: { class: '', style: '' },
      }

    case 'pricing':
      return <SindriMarketingPricing>{
        title: 'Precios',
        description: 'Lorem ipsum dolor sit amet.',
        plans: [
          {
            name: 'Básico',
            price: '$9',
            description: 'Para empezar',
            popular: false,
            features: ['Característica 1', 'Característica 2'],
            action: { description: 'Elegir', variant: 'primary' },
          },
          {
            name: 'Pro',
            price: '$29',
            description: 'Para profesionales',
            popular: true,
            features: ['Todo en Básico', 'Característica 3'],
            action: { description: 'Elegir', variant: 'primary' },
          },
        ],
        htmltag: { class: '', style: '' },
      }

    case 'feature-grids':
      return <SindriMarketingFeatureGrids>{
        title: 'Características',
        description: 'Lorem ipsum dolor sit amet.',
        items: [
          { icon: '⚡', title: 'Rápido', description: 'Lorem ipsum dolor sit amet.' },
          { icon: { svg: '<svg></svg>' }, title: 'Seguro', description: 'Consectetur adipiscing elit.' },
        ],
        htmltag: { class: '', style: '' },
      }

    case 'feature':
      return <SindriMarketingFeature>{
        items: [
          { title: 'Lorem', description: 'Lorem ipsum dolor sit amet.' },
          { title: 'Ipsum', description: 'Consectetur adipiscing elit.' },
        ],
        htmltag: { class: '', style: '' },
      }

    default:
      return null
  }
}
