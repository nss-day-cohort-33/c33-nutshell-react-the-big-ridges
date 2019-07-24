let URL = "http://localhost:5002";

export default {
  getSingleTask(id) {
    return fetch(`${URL}/tasks/${id}`).then(e => e.json());
  },
  getAllTasks() {
    return fetch(`${URL}/tasks`).then(e => e.json());
  },
  postTask(newTask) {
    return fetch(`${URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    }).then(data => data.json());
  },
  putTask(changedTask) {
    return fetch(`${URL}/tasks`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(changedTask)
    }).then(data => data.json());
  },
  deleteTask(id) {
    return fetch(`${URL}/tasks/${id}`, {
      method: "DELETE"
    })
      .then(e => e.json())
      .then(() => fetch(`${URL}/tasks`))
      .then(e => e.json())
      .then(data =>
        this.setState({
          tasks: data
        })
      )
      .then(() => {
        this.props.history.push("tasks");
      });
  }
};
