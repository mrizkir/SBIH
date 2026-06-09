import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataAngkaMelekHuruf = create(
    persist(
        (set, get) => ({
            dataAngkaMelekHuruf: [],
            setDataAngkaMelekHuruf: createArraySetter('dataAngkaMelekHuruf', set),
        }),
        {
            name: 'dataAngkaMelekHuruf', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataAngkaMelekHuruf'),
        },
    ),
)