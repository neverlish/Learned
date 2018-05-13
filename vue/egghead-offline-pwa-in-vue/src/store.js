import idbKeyval from 'idb-keyval'

export const get = id => idbKeyval.get(id)

export const save = (id, messages) => idbKeyval.set(id, messages)
