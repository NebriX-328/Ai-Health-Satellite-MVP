// Starfield Animation
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let numStars = 200;

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.5
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

function updateStars() {
  stars.forEach(star => {
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
}

function animateStars() {
  drawStars();
  updateStars();
  requestAnimationFrame(animateStars);
}
animateStars();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Scroll Reveal Animation for Cards
const cards = document.querySelectorAll('.card');
window.addEventListener('scroll', () => {
  const trigger = window.innerHeight * 0.85;
  cards.forEach(card => {
    const top = card.getBoundingClientRect().top;
    if (top < trigger) {
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }
  });
});

// Charts
const tempCtx = document.getElementById('tempChart').getContext('2d');
const batteryCtx = document.getElementById('batteryChart').getContext('2d');

const tempChart = new Chart(tempCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Temperature (°C)',
      borderColor: '#ffd700',
      data: [],
      fill: false,
      tension: 0.1
    }]
  }
});

const batteryChart = new Chart(batteryCtx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Battery Voltage (V)',
      borderColor: '#00bfff',
      data: [],
      fill: false,
      tension: 0.1
    }]
  }
});

// Simulate live data
let time = 0;
setInterval(() => {
  time++;
  const temp = (20 + Math.random() * 10).toFixed(2);
  const battery = (3.5 + Math.random() * 0.5).toFixed(2);
  const solar = (100 + Math.random() * 20).toFixed(2);

  // Update metrics
  document.getElementById('temp-value').textContent = temp + " °C";
  document.getElementById('battery-value').textContent = battery + " V";
  document.getElementById('solar-value').textContent = solar + " W";

  // Update charts
  tempChart.data.labels.push(time);
  tempChart.data.datasets[0].data.push(temp);
  batteryChart.data.labels.push(time);
  batteryChart.data.datasets[0].data.push(battery);

  if (tempChart.data.labels.length > 20) {
    tempChart.data.labels.shift();
    tempChart.data.datasets[0].data.shift();
    batteryChart.data.labels.shift();
    batteryChart.data.datasets[0].data.shift();
  }

  tempChart.update();
  batteryChart.update();

  // Anomaly detection (basic)
  const alertList = document.getElementById('alert-list');
  if (temp > 28) {
    const li = document.createElement('li');
    li.textContent = `⚠️ High temperature detected: ${temp} °C`;
    alertList.appendChild(li);
  }
  if (battery < 3.6) {
    const li = document.createElement('li');
    li.textContent = `⚠️ Low battery voltage: ${battery} V`;
    alertList.appendChild(li);
  }
}, 2000);

// Fade-in on scroll
document.addEventListener("scroll", () => {
  const elements = document.querySelectorAll(".fade-in");
  elements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    if (position < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
});

// Example simulation of satellite speed & battery
function updateSatelliteData() {
  const speed = (7.5 + Math.random() * 0.2).toFixed(2);
  const battery = Math.floor(70 + Math.random() * 30);
  const lat = (Math.random() * 180 - 90).toFixed(2);
  const long = (Math.random() * 360 - 180).toFixed(2);

  document.querySelector(".card:nth-child(2) p").textContent = speed + " km/s";
  document.querySelector(".card:nth-child(3) p").textContent = `Lat: ${lat}°, Long: ${long}°`;
  document.querySelector(".warn").textContent = battery + "% Battery";

  // Debris alert simulation
  const debris = Math.random() < 0.1; // 10% chance
  document.querySelector(".alerts p").textContent = debris ? "⚠️ Debris detected nearby!" : "✅ No debris detected nearby";
}

// Update every 3 seconds
setInterval(updateSatelliteData, 3000);
