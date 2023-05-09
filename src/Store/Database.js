import {
  getDatabase,
  ref,
  set,
  get,
  child,
  push,
  update,
} from 'firebase/database'

// write data user after sign up
export const writeUserData = (userId, name, email) => {
  const db = getDatabase()
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
  })
}

// get data user
export const getDataUser = async (user) => {
  // read data user
  const dbRef = ref(getDatabase())
  let data = await get(child(dbRef, `users/${user.uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val() // return data yang didapatkan
      } else {
        console.log('No data available')
      }
    })
    .catch((error) => {
      console.error(error)
    })

  // data = Object.entries(data.tasks).map((e, ind) => {
  //   return e[1]
  // })
  return data
}

// write new task
export const writeNewTask = (user, task) => {
  const db = getDatabase()

  // A post entry.
  const postData = {
    task: task,
    checked: false,
  }

  // Get a key for a new Post.
  const newPostKey = push(child(ref(db), 'tasks')).key

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {}
  updates['users/' + user.uid + '/tasks/' + newPostKey] = postData

  console.log('data berhasil dibuat')

  return update(ref(db), updates)
}

// mengupdate objek di path tertentu (check box)
export const updateTask = (user, key, obj) => {
  if (key !== undefined) {
    const db = getDatabase()

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updateChecks = {}
    updateChecks['users/' + user.uid + '/tasks/' + key] = obj

    return update(ref(db), updateChecks)
  }
}

// remove task
export const deleteTask = (user, key) => {
  if (key !== undefined) {
    const db = getDatabase()

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updateChecks = {}
    updateChecks['users/' + user.uid + '/tasks/' + key] = null

    return update(ref(db), updateChecks)
  }
}
