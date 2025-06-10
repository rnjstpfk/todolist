// Firebase SDK import
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-analytics.js";
import { getDatabase, ref, set, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";

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
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskButton = document.getElementById('addTask');
  const taskList = document.getElementById('taskList');
  let currentUser = null;

  // 로그인 상태 확인
  onAuthStateChanged(auth, (user) => {
    currentUser = user;
    if (!user) {
      // 로그인하지 않은 경우 입력 필드와 버튼 비활성화
      taskInput.disabled = true;
      addTaskButton.disabled = true;
      taskInput.placeholder = '로그인이 필요한 서비스입니다.';
      taskList.innerHTML = '<li class="task-item" style="justify-content: center; color: #b8a07a;">로그인이 필요한 서비스입니다.</li>';
    } else {
      // 로그인한 경우 입력 필드와 버튼 활성화
      taskInput.disabled = false;
      addTaskButton.disabled = false;
      taskInput.placeholder = '할 일을 입력하세요...';
      renderTasks();
    }
  });

  // 할 일 추가 함수
  function addTask() {
    if (!currentUser) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    const text = taskInput.value.trim();
    if (text) {
      const newTaskRef = push(ref(db, 'tasks'));
      set(newTaskRef, {
        text,
        completed: false,
        userId: currentUser.uid,
        createdAt: new Date().toISOString()
      });
      taskInput.value = '';
    }
  }

  // 할 일 삭제 함수
  function deleteTask(taskId) {
    if (!currentUser) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }
    remove(ref(db, 'tasks/' + taskId));
  }

  // 완료 상태 토글 함수
  function toggleTask(taskId, completed) {
    if (!currentUser) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }
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
          // 현재 로그인한 사용자의 할 일만 표시
          if (task.userId === currentUser?.uid) {
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
          }
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
});
