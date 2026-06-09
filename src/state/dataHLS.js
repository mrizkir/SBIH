import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataAngkaHarapanLamaSekolah = create(
    persist(
        (set, get) => ({
            dataAngkaHarapanLamaSekolah: [],
            setDataAngkaHarapanLamaSekolah: createArraySetter('dataAngkaHarapanLamaSekolah', set),
        }),
        {
            name: 'dataAngkaHarapanLamaSekolah', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataAngkaHarapanLamaSekolah'),
        },
    ),
)