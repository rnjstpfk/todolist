// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-DFaNr6gtfCy_LeqfQv4oEaY4JfeB-dg",
  authDomain: "ladybug-blackcat.firebaseapp.com",
  projectId: "ladybug-blackcat",
  storageBucket: "ladybug-blackcat.firebasestorage.app",
  messagingSenderId: "682976762246",
  appId: "1:682976762246:web:3b15cef586bbe0cd8d3407",
  measurementId: "G-X7C6J6KN2Y",
  databaseURL: "https://ladybug-blackcat-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 슬라이더 기능
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// 자동 슬라이드
let slideInterval = setInterval(nextSlide, 3000);

// 슬라이더 컨트롤
prevBtn.addEventListener('click', () => {
    clearInterval(slideInterval);
    prevSlide();
    slideInterval = setInterval(nextSlide, 3000);
});

nextBtn.addEventListener('click', () => {
    clearInterval(slideInterval);
    nextSlide();
    slideInterval = setInterval(nextSlide, 3000);
});

// 명대사 데이터
const quotes = [
    {
        text: "Spots on!",
        author: "레이디버그"
    },
    {
        text: "Claws out!",
        author: "블랙캣"
    },
    {
        text: "I'm not a superhero, I'm just a normal girl with a normal life.",
        author: "마리네트"
    },
    {
        text: "I'm not a superhero, I'm just a normal boy with a normal life.",
        author: "아드리앙"
    },
    {
        text: "I am the guardian of the miraculous!",
        author: "마스터 푸"
    }
];

// 명대사 변경 함수
function updateQuote() {
    const quoteBox = document.querySelector('.quote-box');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    quoteBox.innerHTML = `
        <p class="quote-text">"${randomQuote.text}"</p>
        <p class="quote-author">- ${randomQuote.author}</p>
    `;
}

// 페이지 로드 시 명대사 표시
updateQuote();

// 24시간마다 명대사 변경
setInterval(updateQuote, 24 * 60 * 60 * 1000);

// 모바일 메뉴 토글
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// 스크롤 시 네비게이션 바 스타일 변경
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'var(--white)';
        navbar.style.boxShadow = 'var(--shadow)';
    }
}); 