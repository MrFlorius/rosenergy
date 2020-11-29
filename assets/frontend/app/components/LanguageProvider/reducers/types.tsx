export const CHANGE_LOCALE = 'LanguageToggle/CHANGE_LOCALE'

interface ChangeLocaleAction {
    type: typeof CHANGE_LOCALE
    locale: string
}

export interface LocaleState {
    locale: string
}

export type LocaleActionTypes = ChangeLocaleAction