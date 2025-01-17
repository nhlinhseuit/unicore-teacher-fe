import { atom } from 'jotai'

export const classIdAtom = atom<string>('')
export const classCodeAtom = atom<string>('')
export const projectIdAtom = atom<string>('')
export const groupingIdAtom = atom<string>('')

export const isLoginAtom = atom<boolean>(false)