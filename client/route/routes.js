const Todo = resolve => require(['view/to-do'], resolve)

export default [
  {
    path: '/',
    component: Todo
  },
  {
    path: '/home',
    component: Todo
  }
]
