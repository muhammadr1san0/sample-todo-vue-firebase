<template>
  <div>
    <h1>halaman Todos</h1>
    <ul>
      <li v-for="(todo, index) in todos" :key="index" ><div @click="clickData(todo)">{{todo.title}}</div> <a href='#' @click.prevent="deleteData(todo.id)">x</a></li>
    </ul>
    <input type="text" name="title" id="" v-model="title">
    <button @click="addEditData">{{updateIdTodo ? 'Edit':'Simpan'}}</button>
  </div>
</template>

<script>
import db from '../firebase'

export default {
  name: 'Todos',
  data () {
    return {
      todos: [],
      title: '',
      updateIdTodo: ''
    }
  },
  methods: {
    async addEditData () {
      const data = {
        title: this.title,
        validated: false,
        created: new Date()
      }
      console.log(this.updateIdTodo.trim().length)
      if (this.updateIdTodo.trim().length > 0) {
        // ====> ini untuk edit <=====
        db.collection('todos').doc(this.updateIdTodo).set({
          title: this.title,
          validated: false,
          created: new Date()
        })
        this.title = ''
        this.updateIdTodo = ''
        console.log('edit data')
      } else {
        // ====> ini untuk Tambah data <=====
        try {
          await db.collection('todos').add(data)
        } catch (error) {
          console.log(error)
        }
        this.title = ''
      }
    },
    getData () {
      // ====> ini untuk Read data <=====
      db.collection('todos').orderBy('created')
        .onSnapshot((querySnapshot) => {
        // eslint-disable-next-line prefer-const
          let dataTodos = []
          querySnapshot.forEach(doc => {
            // console.log(doc.data())
            dataTodos.push({ ...doc.data(), id: doc.id })
          })
          console.log(dataTodos)
          // eslint-disable-next-line no-unused-expressions
          this.todos = dataTodos.sort((a, b) => { b.created - a.created })
        })
    },
    clickData (todo) {
      this.updateIdTodo = todo.id
      this.title = todo.title
    },
    async deleteData (id) {
      let hasil = true
      try {
        // ====> ini untuk Delete data <=====
        await db.collection('todos').doc(id).delete()
      } catch (error) {
        hasil = false
      }
      if (hasil) {
        const newTodo = this.todos.filter((item) => {
          return item.id !== id
        })
        console.log(newTodo)
        this.todos = newTodo
      }
      console.log(hasil)
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped>

</style>
