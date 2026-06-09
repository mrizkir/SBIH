import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataProduksiPerikananTangkap = create(
    persist(
        (set, get) => ({
            dataProduksiPerikananTangkap: [],
            setDataProduksiPerikananTangkap: createArraySetter('dataProduksiPerikananTangkap', set),
        }),
        {
            name: 'dataProduksiPerikananTangkap', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataProduksiPerikananTangkap'),
        },
    ),
)