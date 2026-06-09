import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataJumlahPendudukBerdasarkanKelompokUmur = create(
    persist(
        (set, get) => ({
            dataJumlahPendudukBerdasarkanKelompokUmur: [],
            setDataJumlahPendudukBerdasarkanKelompokUmur: createArraySetter('dataJumlahPendudukBerdasarkanKelompokUmur', set),
        }),
        {
            name: 'dataJumlahPendudukBerdasarkanKelompokUmur', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataJumlahPendudukBerdasarkanKelompokUmur'),
        },
    ),
)