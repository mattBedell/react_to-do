import React     from 'react';
import Nav       from '../Nav/Nav';
import TaskForm  from '../TaskForm';
import Footer    from '../Footer/Footer';
import TaskList  from '../TaskList';

import './App.css';
import './GA_gear.png';

class Task {
  constructor(name, desc) {
    this.name = name;
    this.desc = desc;
  }
}


export default class App extends React.Component {

  constructor(props) {
    super();

    this.state = {
      tasks: {},
      taskName: undefined,
      taskDescription: undefined,
    };
    this.addTask = this.addTask.bind(this);
  }
  addTask(task) {
    if(task.name === '') {
    } else {
      fetch('http://localhost:3000/tasks', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(task)
      }).then( () => {
        fetch('http://localhost:3000/tasks', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "GET"
        }).then( (r) => r.json())
          .then((data) => {
            this.setState({
              tasks: data
            })
          })
      })
      .catch((err) => {
        console.log(`POST FETCH ERROR ${err}`);
      })
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    let name = e.target.taskName.value;
    let desc = e.target.taskDesc.value;

    const newTask = {name, taskDesc}

    this.addTask(newTask);


  }
  componentDidMount() {
    fetch('http://localhost:3000/tasks')
    .then((r) => r.json())
    .then((data) => {
      this.setState({
        tasks: data
      })
    })
    .catch((err) => {
      console.log(`GET FETCH ERROR ${err}`);
    })
  }
  render() {
    return (
      <container>
        <header>
          <Nav />
        </header>
        <main className="container">
          <section className="jumbotron">
            <h1>Task Manager</h1>
            <TaskForm
              preventDef={(event) => this.handleSubmit(event)}
            />
          </section>
          {/* to do lists */}
          <section className="row">
            <article className="col-md-4">
              <h3>Open Items</h3>
              <TaskList
                collection={this.state.tasks.newItems}
               />
            </article>

            <article className="col-md-4">
              <h3>Completed Items</h3>
              <TaskList />
            </article>

            <article className="col-md-4">
              <h3>Deleted Items</h3>
              <TaskList />
            </article>
          </section>
        </main>
        <footer>
          <Footer />
        </footer>

      </container>
    );
  }

}
