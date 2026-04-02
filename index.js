const cake = document.getElementById("cake");
const flame1 = document.getElementById("flame1");
const flame2 = document.getElementById("flame2");
const wick1 = document.getElementById("wick1");
const wick2 = document.getElementById("wick2");
const message = document.getElementById("message");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let blown = false;
let confetti = [];
let confettiRunning = false;
let intensity = 1;

function getScale() {
	const style = window.getComputedStyle(document.body);
	const transform = style.transform;

	if (transform === "none") return 1;

	const matrix = transform.match(/matrix\(([^)]+)\)/);
	if (matrix) {
		return parseFloat(matrix[1].split(",")[0]);
	}

	return 1;
}

function resizeCanvas() {
	const scale = getScale();

	canvas.width = window.innerWidth * scale;
	canvas.height = window.innerHeight * scale;

	canvas.style.width = window.innerWidth + "px";
	canvas.style.height = window.innerHeight + "px";
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createSmoke(flame) {
	for (let i = 0; i < 6; i++) {
		const smoke = document.createElement("div");
		smoke.classList.add("smoke");

		const parent = flame.parentElement;

		smoke.style.left = (flame.offsetLeft + 2 + Math.random() * 6) + "px";
		smoke.style.top = (flame.offsetTop + 10) + "px";

		parent.appendChild(smoke);

		setTimeout(() => smoke.remove(), 1800);
	}
}

const colors = ["#ff4d6d", "#ffd166", "#06d6a0", "#118ab2", "#8338ec", "#ff9f1c"];

function createConfetti() {
	const amount = 120 + intensity * 80;

	for (let i = 0; i < amount; i++) {
		confetti.push({
			x: Math.random() * window.innerWidth,
			y: Math.random() * -window.innerHeight,
			size: Math.random() * (4 + intensity) + 2,
			speed: Math.random() * (2 + intensity) + 2,
			sway: Math.random() * 2 - 1,
			color: colors[Math.floor(Math.random() * colors.length)]
		});
	}
}

function drawConfetti() {
	const scale = getScale();

	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.scale(scale, scale);

	confetti.forEach(p => {
		ctx.fillStyle = p.color;

		p.x += Math.sin(p.y * 0.05) * p.sway;

		ctx.fillRect(p.x, p.y, p.size, p.size);

		p.y += p.speed;

		if (p.y > window.innerHeight) {
			p.y = -10;
			p.x = Math.random() * window.innerWidth;
		}
	});

	requestAnimationFrame(drawConfetti);
}

cake.addEventListener("click", () => {

	if (!blown) {
		createSmoke(flame1);
		createSmoke(flame2);

		flame1.style.display = "none";
		flame2.style.display = "none";
		wick1.style.display = "none";
		wick2.style.display = "none";

		blown = true;
	}

	intensity++;

	createConfetti();

	if (!confettiRunning) {
		drawConfetti();
		confettiRunning = true;
	}

	if (navigator.vibrate) {
		navigator.vibrate([50 * intensity, 30, 80 * intensity]);
	}

	if (navigator.vibrate && window.innerWidth < 600) {
		navigator.vibrate(80);
	}
	
	message.classList.remove("hidden");
	message.classList.add("show");
});

let lastTouchEnd = 0;

document.addEventListener("touchend", function (e) {
	const now = Date.now();

	if (now - lastTouchEnd <= 300) {
		e.preventDefault();
	}

	lastTouchEnd = now;
}, { passive: false });