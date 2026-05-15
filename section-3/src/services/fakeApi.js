import { users } from '../data/mockData'

export const fakeLogin = (username) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((u) => u.username === username)

      if (user) {
        resolve(user)
      } else {
        reject('User not found')
      }
    }, 1000)
  })
}