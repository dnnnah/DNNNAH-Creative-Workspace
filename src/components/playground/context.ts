import { createContext, useContext } from 'react'
export const PlaygroundContext = createContext({ sound: false, toggleSound: () => {}, ink: false, toggleInk: () => {}, discover: () => {} })
export const usePlayground = () => useContext(PlaygroundContext)
