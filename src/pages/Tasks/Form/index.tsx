import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../../service/api';

import '../index.css';


interface ITask {
  title: string;
  description: string;
}

const Tasks: React.FC = () => {

  const [model, setModel] = useState<ITask>({
    title: '',
    description: ''
  });

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      findTask(id);
    }
  }, [id]);

  function back() {
    history.goBack();
  }

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setModel({
      ...model,
      [e.target.name]: e.target.value
    });
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      const response = await api.put(`/tasks/${id}`, model);
    } else {
      const response = await api.post('/tasks', model);
    }
    back();

  }

  async function findTask(id: string) {
    const response = await api.get(`/tasks/${id}`);
    setModel({
      title: response.data.title,
      description: response.data.description
    });
  }

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>New Task</h1>
        <Button variant="dark" size="sm" onClick={back}>Back</Button>
      </div>
      <br />
      <div className="container">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={model.title}
              placeholder="Title"
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={model.description}
              placeholder="Description"
              onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
            />
          </Form.Group>

          <Button variant="dark" type="submit">
            Save
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Tasks;