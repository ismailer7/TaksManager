import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const SingleTask = props => {
  return (
    <li key={props.index} className="item-list">
      {" "}
      <p className="toLeft">{props.task} </p>
      <button data-index={props.index} onClick={props.delete}>
        Delete Task
      </button>
    </li>
  );
};

// add localStorage
class App extends Component {
  constructor(probs) {
    super(probs);
    this.state = {
      tasks: [],
      currentTask: "",
      error: false
    };
  }

  componentDidMount() {
    // load tasks from localStorage
    if (localStorage.getItem("tasks")) {
      // console.log(typeof localStorage.getItem("tasks"));
      let dataUpdated = [];
      for (const item of localStorage.getItem("tasks").split(",")) {
        dataUpdated.push(item);
      }
      this.setState({
        tasks: dataUpdated
      });
    }

    window.addEventListener("beforeunload", () => {
      // update tasks before end
      localStorage.setItem("tasks", this.state.tasks);
    });
  }

  updateInput = event => {
    this.setState({
      currentTask: event.target.value
    });
  };

  addTask = () => {
    if (this.state.currentTask !== "") {
      const copyTask = [...this.state.tasks, this.state.currentTask];
      this.setState({
        tasks: copyTask,
        currentTask: "",
        error: false
      });
    } else {
      this.setState({
        error: true
      });
    }
  };

  deleteTask = event => {
    const index = event.target.dataset.index;
    // console.log(index);
    const copyTask = [...this.state.tasks];
    copyTask.splice(index, 1);
    this.setState({
      tasks: copyTask,
      error: false
    });
  };
  clear = () => {
    this.setState({
      tasks: [],
      currentTask: "",
      error: false
    });
  };
  render() {
    let taskList = this.state.tasks.map((element, index) => {
      return (
        <SingleTask task={element} index={index} delete={this.deleteTask} />
      );
    });
    return (
      <div className="App">
        <h1>Tasks Manager</h1>
        <ul className="taskList">{taskList}</ul>
        <input
          onChange={this.updateInput}
          type="text"
          placeholder="Enter a task"
          value={this.state.currentTask}
          className={this.state.error ? "error" : ""}
        />
        <button onClick={this.addTask}>Add Task</button>
        <br />
        <p className="text-error" hidden={!this.state.error}>
          Enter some Task to add
        </p>
        <br />
        <span>total tasks are : {this.state.tasks.length}</span>
        <br />
        <br />
        <button onClick={this.clear}>Clear</button>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
