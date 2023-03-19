// 1 task
let now = new Date();
let currentTime = document.querySelector(".time");

let hour = now.getHours();
let minute = now.getMinutes();
currentTime.innerHTML = `${hour}:${minute} <small>PM</small>`;
