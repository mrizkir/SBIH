import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataJumlahRumahTidakLayakHuni = create(
    persist(
        (set, get) => ({
            dataJumlahRumahTidakLayakHuni: [],
            setDataJumlahRumahTidakLayakHuni: createArraySetter('dataJumlahRumahTidakLayakHuni', set),
        }),
        {
            name: 'dataJumlahRumahTidakLayakHuni', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataJumlahRumahTidakLayakHuni'),
        },
    ),
)