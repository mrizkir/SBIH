import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataIndeksPembangunanGender = create(
    persist(
        (set, get) => ({
            dataIndeksPembangunanGender: [],
            setDataIndeksPembangunanGender: createArraySetter('dataIndeksPembangunanGender', set),
        }),
        {
            name: 'dataIndeksPembangunanGender', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataIndeksPembangunanGender'),
        },
    ),
)