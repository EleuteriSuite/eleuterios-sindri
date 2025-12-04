export {} // ensure this file is a module

export function SindriBlockFactory(category, block): SindriMarketingHero | null {
  if (category === 'marketing' && block === 'hero') {
    return <SindriMarketingHero>{
      title: {
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      subtitle: {
        description: 'Sub Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      },
      action: {
        description: 'Lorem ipsum',
        variant: 'primary',
        size: 'sm',
        as: 'a',
        href: '#',
      },
      htmltag: {
        class: '',
        style: '',
      }
    }
  }

  return null
}
