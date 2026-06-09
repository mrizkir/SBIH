import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataJumlahProduksiPeternakan = create(
    persist(
        (set, get) => ({
            dataJumlahProduksiPeternakan: [],
            setDataJumlahProduksiPeternakan: createArraySetter('dataJumlahProduksiPeternakan', set),
        }),
        {
            name: 'dataJumlahProduksiPeternakan', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataJumlahProduksiPeternakan'),
        },
    ),
)