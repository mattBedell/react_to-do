import React     from 'react';
import Nav       from '../Nav/Nav';
import TaskForm  from '../TaskForm';
import Footer    from '../Footer/Footer';
import TaskList  from '../TaskList';

import './App.css';
import './GA_gear.png';


export default class App extends React.Component {

  constructor(props) {
    super();

    this.state = {
      tasks: {},
    };

    this.addTask = this.addTask.bind(this);
  }

  addTask(name, desc) {

    fetch('/tasks', {
      method: 'post',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({name, desc})
    })
      .then(r => r.json())
      .then((newTask) => {
        // clone existing state
        const newState = {...this.state.tasks};
        newState[newTask.id] = newTask;
        this.setState({tasks: newState});
      })
      .catch((error) => {
        throw error;
      });
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
            <TaskForm addTask={this.addTask} />
          </section>
          {/* to do lists */}
          <section className="row">

            {/* OPEN TASKS */}
            <article className="col-md-4">
              <h3>Open Items</h3>
              <TaskList collection={this.state.tasks} />
            </article>

            {/* COMPLETED TASKS  */}
            <article className="col-md-4">
              <h3>Completed Items</h3>
              <TaskList collection={this.state.tasks} />
            </article>

            {/* DELETED TASKS */}
            <article className="col-md-4">
              <h3>Deleted Items</h3>
              <TaskList collection={this.state.tasks} />
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
