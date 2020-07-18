import React, { useState, useEffect } from 'react';
import { Table, Badge, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import api from '../../service/api';

import './index.css';

import moment from 'moment';

interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
}

const Tasks: React.FC = () => {

  const [tasks, setTasks] = useState<ITask[]>([]);
  const history = useHistory();

  useEffect(() => {
    loadTasks();
  }, [])

  async function loadTasks() {

    const response = await api.get('/tasks');

    setTasks(response.data);

  }

  async function finishedTask(id: number) {
    await api.patch(`/tasks/${id}`);
    loadTasks();
  }

  async function deleteTask(id: number) {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  }

  function formatDate(date: Date) {
    return moment(date).format("DD/MM/YYYY");
  }

  function newTask() {
    history.push('/task_register');
  }

  function editTask(id: number) {
    history.push(`/task_edit/${id}`);
  }

  function viewTask(id: number) {
    history.push(`/task/${id}`);
  }

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Page Tasks</h1>
        <Button variant="dark" size="sm" onClick={newTask}>New Task</Button>
      </div>
      <br />

      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Updated at</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            tasks.map(task => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{formatDate(task.updated_at)}</td>
                <td>
                  <Badge variant={task.finished ? "success" : "warning"}>
                    {task.finished ? "Finished" : "Pending"}
                  </Badge>
                </td>
                <td>
                  <Button size="sm" disabled={task.finished} onClick={() => editTask(task.id)}>Edit</Button>{' '}
                  <Button size="sm" disabled={task.finished} variant="success" onClick={() => finishedTask(task.id)}>Finish</Button>{' '}
                  <Button size="sm" variant="info" onClick={() => viewTask(task.id)}>To view</Button>{' '}
                  <Button size="sm" variant="danger" onClick={() => deleteTask(task.id)}>Delete</Button>{' '}
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
}

export default Tasks;