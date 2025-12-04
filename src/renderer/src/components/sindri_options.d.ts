export {} // ensure this file is a module

declare global {
  interface SindriOptions {
    title: string
    slug: string
    date: Date
  }
}
