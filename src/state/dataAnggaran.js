import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataAnggaran = create(
    persist(
        (set, get) => ({
            dataAnggaran: [],
            setDataAnggaran: createArraySetter('dataAnggaran', set),
        }),
        {
            name: 'dataAnggaran', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataAnggaran'),
        },
    ),
)