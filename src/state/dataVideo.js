import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataVideo = create(
    persist(
        (set, get) => ({
            dataVideo: [],
            setDataVideo: createArraySetter('dataVideo', set),
        }),
        {
            name: 'dataVideo', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataVideo'),
        },
    ),
)