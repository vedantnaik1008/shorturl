const sessionIdToUserMap = new Map() //statefull

export function setUser(id, user) {
    sessionIdToUserMap.set(id, user)
}

export function getUser(id) {
    return sessionIdToUserMap.get(id)
}