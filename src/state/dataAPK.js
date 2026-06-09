import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataAngkaPartisipasiKasar = create(
    persist(
        (set, get) => ({
            dataAngkaPartisipasiKasar: [],
            setDataAngkaPartisipasiKasar: createArraySetter('dataAngkaPartisipasiKasar', set),
        }),
        {
            name: 'dataAngkaPartisipasiKasar', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataAngkaPartisipasiKasar'),
        },
    ),
)