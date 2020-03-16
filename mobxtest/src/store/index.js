import { observable, action, computed } from 'mobx'
import moment from 'moment'

class AppStore {
  @observable time = '2019'
  @observable todos = []

  @computed get desc() {
  	return `${this.time} ${this.todos.length} exits`
  }

  @action addTodo(todo) {
  	this.todos.push(todo)
  }
  @action deleteTodo() {
  	this.todos.pop()
  }
  @action resetTodo() {
  	this.todos = []
  }
  @action getNew() {
  	this.time = moment().format('YYYY-MM-DD HH:mm:ss')
  }
}

const store = new AppStore()

setInterval(()=>{
  store.getNew()
}, 1000);

export default store