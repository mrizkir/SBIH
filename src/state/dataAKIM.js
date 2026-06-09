import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataAngkaKematianIbuMelahirkan = create(
    persist(
        (set, get) => ({
            dataAngkaKematianIbuMelahirkan: [],
            setDataAngkaKematianIbuMelahirkan: createArraySetter('dataAngkaKematianIbuMelahirkan', set),
        }),
        {
            name: 'dataAngkaKematianIbuMelahirkan', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataAngkaKematianIbuMelahirkan'),
        },
    ),
)