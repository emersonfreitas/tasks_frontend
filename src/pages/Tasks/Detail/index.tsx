import React, { useState, useEffect } from 'react';
import { Button, Card, Badge } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../../service/api';
import moment from 'moment';

interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
}

const Detail: React.FC = () => {

  const history = useHistory();
  const { id } = useParams();
  const [task, setTask] = useState<ITask>();

  useEffect(() => {
    findTask()
  }, [id]);

  function back() {
    history.goBack();
  }

  function formatDate(date: Date | undefined) {
    return moment(date).format("DD/MM/YYYY");
  }

  async function findTask() {
    const response = await api.get<ITask>(`/tasks/${id}`);
    setTask(response.data);
  }

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Task Detail</h1>
        <Button variant="dark" size="sm" onClick={back}>Back</Button>
      </div>
      <br />
      <Card>
        <Card.Body>
          <Card.Title>{task?.title}</Card.Title>
          <Card.Text>
            {task?.description}
            <br />
            <Badge variant={task?.finished ? "success" : "warning"}>
              {task?.finished ? "FINISHED" : "PENDING"}
            </Badge>
            <br />
            <strong>Registration date: </strong>
            <Badge variant="info">
              {formatDate(task?.created_at)}
            </Badge>
            <br />
            <strong>Update date: </strong>
            <Badge variant="info">
              {formatDate(task?.updated_at)}
            </Badge>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Detail;