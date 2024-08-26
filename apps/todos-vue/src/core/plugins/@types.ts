import type { ThemeDefinition } from 'vuetify'

interface VariationsOptions {
  colors: string[]
  lighten: number
  darken: number
}

export type ThemeOptions =
  | false
  | {
      cspNonce?: string
      defaultTheme?: string
      variations?: false | VariationsOptions
      themes?: Record<string, ThemeDefinition>
    }
