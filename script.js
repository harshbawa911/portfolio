/**
 * Portfolio JS - Harsh's Portfolio
 * Handles smooth scroll, theme toggle, typing animation, mobile menu, projects functionality (Todo, Calculator, Weather, Form)
 */

// Smooth scrolling for nav links
document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
let isDark = localStorage.getItem('darkMode') === 'true';

function initTheme() {
    body.classList.toggle('dark-mode', isDark);
    themeToggle.checked = isDark;
}

function toggleTheme() {
    isDark = !isDark;
    body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('darkMode', isDark);
}

// Typing animation for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Mobile hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-menu li a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Project: Todo App
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${todo}</span>
            <button onclick="deleteTodo(${index})">Delete</button>
        `;
        todoList.appendChild(li);
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo(e) {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        todos.push(text);
        todoInput.value = '';
        renderTodos();
    }
}

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

// Project: Calculator
let calcDisplay = document.getElementById('calc-display');
let calcCurrent = '0';
let calcOperator = null;
let calcPrevious = null;

function calcInput(value) {
    if (value === 'C') {
        calcCurrent = '0';
        calcOperator = null;
        calcPrevious = null;
    } else if (value === '=') {
        if (calcOperator && calcPrevious !== null) {
            calcCurrent = String(eval(calcPrevious + calcOperator + parseFloat(calcCurrent)));
            calcOperator = null;
            calcPrevious = null;
        }
    } else if (['+', '-', '*', '/'].includes(value)) {
        calcOperator = value;
        calcPrevious = parseFloat(calcCurrent);
        calcCurrent = '0';
    } else {
        calcCurrent = calcCurrent === '0' ? value : calcCurrent + value;
    }
    calcDisplay.textContent = calcCurrent;
}

// Project: Weather App (mock data, replace with real API key)
async function getWeather(city) {
    // Mock data - replace with: https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_KEY&units=metric
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                name: city,
                main: { temp: 25 + Math.floor(Math.random() * 15), feels_like: 27 },
                weather: [{ description: 'clear sky', icon: 'sunny' }]
            });
        }, 1000);
    });
}

async function fetchWeather() {
    const city = document.getElementById('weather-city').value || 'Ambala';
    const data = await getWeather(city);
    document.getElementById('weather-info').innerHTML = `
        <p>${data.name}: ${data.main.temp}°C (feels ${data.main.feels_like}°C)</p>
        <p>${data.weather[0].description}</p>
    `;
}

// Project: Contact Form validation
function submitForm() {
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const msg = document.getElementById('contact-msg').value;

    if (name && email.includes('@') && msg) {
        alert('Message sent! (simulated)');
        document.getElementById('contact-form').reset();
    } else {
        alert('Please fill all fields correctly.');
    }
}

// Skill bars animation on scroll
function animateSkills() {
    const skills = document.querySelectorAll('.skill-bar');
    skills.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            bar.style.width = bar.dataset.percent;
        }
    });
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// Init
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    typeWriter(document.querySelector('.typing'), 'Web Technology Student | Aspiring Full-Stack Developer', 150);
    renderTodos();
    window.addEventListener('scroll', animateSkills);
    themeToggle.addEventListener('change', toggleTheme);

    // Event listeners for projects
    todoForm.addEventListener('submit', addTodo);
    document.querySelectorAll('.calc-btn').forEach(btn => {
        btn.addEventListener('click', () => calcInput(btn.dataset.value));
    });
    document.getElementById('weather-btn').addEventListener('click', fetchWeather);
});

