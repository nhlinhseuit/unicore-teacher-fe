import { atom } from 'jotai'

export const classIdAtom = atom<string>('')
export const classCodeAtom = atom<string>('')
export const projectIdAtom = atom<string>('')
export const groupingIdAtom = atom<string>('')

export const startTopicImportTimeAtom = atom<string | null>()
export const endTopicImportTimeAtom = atom<string | null>()

// export const isLoginAtom = atom<boolean>(false)