import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataAtasDasarHargaBerlaku = create(
    persist(
        (set, get) => ({
            dataAtasDasarHargaBerlaku: [],
            setDataAtasDasarHargaBerlaku: createArraySetter('dataAtasDasarHargaBerlaku', set),
        }),
        {
            name: 'dataAtasDasarHargaBerlaku', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataAtasDasarHargaBerlaku'),
        },
    ),
)