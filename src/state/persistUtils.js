export const normalizeArrayData = (data) => (Array.isArray(data) ? data : [])

export const createArrayPersistOptions = (fieldName) => ({
  merge: (persistedState, currentState) => ({
    ...currentState,
    ...persistedState,
    [fieldName]: normalizeArrayData(persistedState?.[fieldName]),
  }),
})

export const createArraySetter = (fieldName, set) => (dataFetch) =>
  set({ [fieldName]: normalizeArrayData(dataFetch) })
