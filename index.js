const cake = document.getElementById("cake");
const flame1 = document.getElementById("flame1");
const flame2 = document.getElementById("flame2");
const message = document.getElementById("message");

cake.addEventListener("click", () => {
	flame1.style.display = "none";
	flame2.style.display = "none";

	message.classList.remove("hidden");
	message.classList.add("show");
});