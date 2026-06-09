import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataIPM = create(
    persist(
        (set, get) => ({
            dataIPM: [],
            setDataIPM: createArraySetter('dataIPM', set),
        }),
        {
            name: 'dataIPM', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataIPM'),
        },
    ),
)