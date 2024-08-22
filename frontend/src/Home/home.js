import React, { useState, useEffect } from 'react';
import { Button, Form, Input, List, Modal, Select, Typography, Tag, Pagination } from 'antd';
import axios from 'axios';
import './home.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Option } = Select;
const { Title } = Typography;

function Home() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filter, setFilter] = useState({ status: '', priority: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);

  useEffect(() => {
    fetchTasks();
  }, [filter, currentPage]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks', {
        params: {
          page: currentPage,
          limit: 10, // Number of tasks per page
          status: filter.status,
          priority: filter.priority,
        },
      });
      setTasks(response.data.tasks);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      setTotalTasks(response.data.totalTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCreateTask = async (values) => {
    try {
      await axios.post('/api/tasks/create', values);
      fetchTasks();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async (id, values) => {
    try {
      await axios.patch(`/api/tasks/${id}`, values);
      if (values.status === 'Done') {
        toast.success('Task completed successfully');
        fetchTasks(); // Refresh tasks
      } else if (values.status === 'In Progress') {
        toast.info('Good Luck with your task');
      } else {
        fetchTasks();
      }
      setSelectedTask(null);
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Error updating task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      toast.success('Task deleted successfully');
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Error deleting task');
    }
  };

  const showModal = () => {
    setSelectedTask(null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTask(null);
  };

  const handleFilterChange = (value, type) => {
    setFilter(prevFilter => ({ ...prevFilter, [type]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  return (
    <div className="task-manager">
      <Title level={2} className="task-manager-title">Task Manager</Title>
      <Button type="primary" onClick={showModal} className="create-task-btn">Create Task</Button>
      
      <div className="filter-container">
        <Select 
          placeholder="Filter by status" 
          onChange={(value) => handleFilterChange(value, 'status')} 
          style={{ width: 200, marginRight: 10 }}
        >
          <Option value="">All</Option>
          <Option value="Todo">Todo</Option>
          <Option value="In Progress">In Progress</Option>
          <Option value="Done">Done</Option>
        </Select>
        <Select 
          placeholder="Filter by priority" 
          onChange={(value) => handleFilterChange(value, 'priority')} 
          style={{ width: 200 }}
        >
          <Option value="">All</Option>
          <Option value="Low">Low</Option>
          <Option value="Medium">Medium</Option>
          <Option value="High">High</Option>
        </Select>
      </div>

      <List
        itemLayout="horizontal"
        dataSource={tasks}
        renderItem={task => (
          <List.Item
            className="task-item"
            actions={[
              <Button type="link" onClick={() => { setSelectedTask(task); setIsModalVisible(true); }}>Edit</Button>,
              <Button type="link" danger onClick={() => handleDeleteTask(task.id)}>Delete</Button>
            ]}
          >
            <List.Item.Meta
              title={task.title}
              description={`${task.description || ''} - ${task.status} - ${task.priority}`}
              avatar={<Tag color={task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'orange' : 'green'}>{task.priority}</Tag>}
            />
          </List.Item>
        )}
      />

      <Pagination
        current={currentPage}
        total={totalTasks}
        pageSize={10}
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: 20, textAlign: 'center' }}
      />

      <Modal
        title={selectedTask ? "Edit Task" : "Create Task"}
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        className="task-modal"
      >
        <Form
          initialValues={selectedTask}
          onFinish={(values) => {
            if (selectedTask) {
              handleUpdateTask(selectedTask.id, values);
            } else {
              handleCreateTask(values);
            }
          }}
        >
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status" initialValue="Todo">
            <Select>
              <Option value="Todo">Todo</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Done">Done</Option>
            </Select>
          </Form.Item>
          <Form.Item name="priority" label="Priority" initialValue="Medium">
            <Select>
              <Option value="Low">Low</Option>
              <Option value="Medium">Medium</Option>
              <Option value="High">High</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="save-task-btn">
              {selectedTask ? "Update Task" : "Create Task"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <ToastContainer />
    </div>
  );
}

export default Home;
