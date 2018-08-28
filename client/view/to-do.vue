<template>
    <div class="real-app">
        <input
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="接下去要做什么？"
            @keyup.enter="addTodo"
        >
        <itemx
         v-for="todo in filteredTodos"
         :key="todo.id"
         :todo='todo'
         @del='deleteTodo'
         ></itemx>

         <tabx
            :filter="filter"
            :todos="todos"
            @toggle="toggleFilter"
            @clearAllCompleted="clearAllCompleted"
        />
    </div>
</template>

<script>
import itemx from './item'
import tabx from './tabs'
export default {
  data () {
    return {
      todos: [],
      filter: 'all'
    }
  },
  methods: {
    addTodo (e) {
      let id = 0
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
      console.log(this.todos)
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  },
  components: {
    itemx,
    tabx
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  }
}
</script>

<style lang='stylus' scoped>
.real-app{
    width 600px
    margin 0 auto
    box-shadow 0 0 5px #666666
}
.add-input{
    position relative
    margin 0
    width 100%
    font-size 24px
    font-family inherit
    font-weight inherit
    line-height 1.4em
    border: 1px solid #999;
    outline none
    color inherit
    padding 6px
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    font-smoothing: antialiased;
    padding: 16px 16px 16px 60px;
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}

</style>
