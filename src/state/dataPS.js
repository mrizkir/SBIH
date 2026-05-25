import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const stateDataPS = create(
    persist(
        (set, get) => ({
            dataPS: [],
            setDataPS: (dataFetch) => set({ dataPS: dataFetch }),
        }),
        {
            name: 'dataPS',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
)
