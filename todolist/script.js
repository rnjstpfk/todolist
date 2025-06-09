// Firebase SDK import
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-analytics.js";
import { getDatabase, ref, set, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAPFWM1gRimyBiwGnyFEK_9tS6JWy3z6XY",
  authDomain: "todolist-389e2.firebaseapp.com",
  projectId: "todolist-389e2",
  storageBucket: "todolist-389e2.appspot.com",
  messagingSenderId: "7573199947",
  appId: "1:7573199947:web:0132e5ce479a409e0a81ce",
  measurementId: "G-BE6GMKT7NY",
  databaseURL: "https://todolist-389e2-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskButton = document.getElementById('addTask');
  const taskList = document.getElementById('taskList');

  // 할 일 추가 함수
  function addTask() {
    const text = taskInput.value.trim();
    if (text) {
      const newTaskRef = push(ref(db, 'tasks'));
      set(newTaskRef, {
        text,
        completed: false
      });
      taskInput.value = '';
    }
  }

  // 할 일 삭제 함수
  function deleteTask(taskId) {
    remove(ref(db, 'tasks/' + taskId));
  }

  // 완료 상태 토글 함수
  function toggleTask(taskId, completed) {
    update(ref(db, 'tasks/' + taskId), { completed });
  }

  // 할 일 렌더링 함수 (Firebase에서 실시간으로 불러오기)
  function renderTasks() {
    const taskRef = ref(db, 'tasks');
    onValue(taskRef, (snapshot) => {
      taskList.innerHTML = '';
      const data = snapshot.val();
      if (data) {
        Object.entries(data).forEach(([key, task]) => {
          const li = document.createElement('li');
          li.className = `task-item ${task.completed ? 'completed' : ''}`;

          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.checked = task.completed;
          checkbox.addEventListener('change', () => toggleTask(key, !task.completed));

          const span = document.createElement('span');
          span.textContent = task.text;

          const deleteButton = document.createElement('button');
          deleteButton.className = 'delete-btn';
          deleteButton.textContent = '삭제';
          deleteButton.addEventListener('click', () => deleteTask(key));

          li.appendChild(checkbox);
          li.appendChild(span);
          li.appendChild(deleteButton);
          taskList.appendChild(li);
        });
      }
    });
  }

  // 이벤트 리스너 등록
  addTaskButton.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });

  // 초기 렌더링
  renderTasks();
});
