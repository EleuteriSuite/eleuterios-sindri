export {} // ensure this file is a module

export function SindriUIBlockFactory(category, block): SindriMarketingHero | null {
  if (category === 'ui' && block === 'breadcrumbs') {
    return <SindriUIBreadcrumbs>{
      items: [
        {
          title: 'Lorem ipsum',
          href: '#'
        }
      ]
    }
  }

  return null
}
