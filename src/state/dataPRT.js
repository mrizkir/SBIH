import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataPenggunaanAirBersih = create(
    persist(
        (set, get) => ({
            dataPenggunaanAirBersih: [],
            setDataPenggunaanAirBersih: createArraySetter('dataPenggunaanAirBersih', set),
        }),
        {
            name: 'dataPenggunaanAirBersih', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataPenggunaanAirBersih'),
        },
    ),
)