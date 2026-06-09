import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataPanjangJalanDibangun = create(
    persist(
        (set, get) => ({
            dataPanjangJalanDibangun: [],
            setDataPanjangJalanDibangun: createArraySetter('dataPanjangJalanDibangun', set),
        }),
        {
            name: 'dataPanjangJalanDibangun', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataPanjangJalanDibangun'),
        },
    ),
)