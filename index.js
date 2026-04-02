const cake = document.getElementById("cake");
const flame1 = document.getElementById("flame1");
const flame2 = document.getElementById("flame2");
const wick1 = document.getElementById("wick1");
const wick2 = document.getElementById("wick2");
const message = document.getElementById("message");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

function createSmoke(flame) {
	const rect = flame.getBoundingClientRect();

	for (let i = 0; i < 6; i++) {
		const smoke = document.createElement("div");
		smoke.classList.add("smoke");

		smoke.style.left = rect.left + Math.random() * 10 + "px";
		smoke.style.top = rect.top + "px";

		document.body.appendChild(smoke);

		setTimeout(() => smoke.remove(), 1000);
	}
}

const colors = ["#ff4d6d", "#ffd166", "#06d6a0", "#118ab2", "#8338ec", "#ff9f1c"];

function createConfetti() {
	confetti = [];

	for (let i = 0; i < 180; i++) {
		confetti.push({
			x: Math.random() * canvas.width,
			y: Math.random() * -canvas.height,
			size: Math.random() * 6 + 3,
			speed: Math.random() * 3 + 2,
			color: colors[Math.floor(Math.random() * colors.length)]
		});
	}
}

function drawConfetti() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	confetti.forEach(p => {
		ctx.fillStyle = p.color;
		ctx.fillRect(p.x, p.y, p.size, p.size);
		p.y += p.speed;

		if (p.y > canvas.height) {
			p.y = -10;
		}
	});

	requestAnimationFrame(drawConfetti);
}

cake.addEventListener("click", () => {

	createSmoke(flame1);
	createSmoke(flame2);

	flame1.style.display = "none";
	flame2.style.display = "none";
	wick1.style.display = "none";
	wick2.style.display = "none";

	createConfetti();
	drawConfetti();

	message.classList.remove("hidden");
	message.classList.add("show");
});