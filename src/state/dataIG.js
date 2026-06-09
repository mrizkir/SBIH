import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataIndeksGini = create(
    persist(
        (set, get) => ({
            dataIndeksGini: [],
            setDataIndeksGini: createArraySetter('dataIndeksGini', set),
        }),
        {
            name: 'dataIndeksGini', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataIndeksGini'),
        },
    ),
)