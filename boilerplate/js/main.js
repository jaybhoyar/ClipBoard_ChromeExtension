// You js goes here
let textArea = document.querySelector(".text_input");
let search = document.querySelector(".search");

let container = document.querySelector(".container_2");
let clips = JSON.parse(localStorage.getItem("clipArr")) || [];
let id = Date.now();

function createClips(event) {
	if (event.keyCode == 13 && event.target.value.trim() != "") {
		console.log(event.target.value);
		const clip = {
			content: event.target.value,
			id: ++id,
		};
		clips.push(clip);
		localStorage.setItem("clipArr", JSON.stringify(clips));
		event.target.value = "";
		clips = JSON.parse(localStorage.getItem("clipArr"));
		viewClips(clips);
	}
}
function viewClips(clipsArr) {
	container.innerHTML = "";
	clipsArr.forEach((clip) => {
		// Defining elements
		let parentDiv = document.createElement("div");
		let contentDiv = document.createElement("div");
		let spanX = document.createElement("span");
		// Add Styling
		parentDiv.setAttribute("data-id", clip.id);
		parentDiv.classList.add("show_clip");
		contentDiv.classList.add("content_styles");
		spanX.classList.add("spanX");
		// Add Text
		contentDiv.innerText = clip.content;
		spanX.innerHTML = "-";
		// Appending
		parentDiv.append(spanX, contentDiv);
		container.append(parentDiv);
		// Event Listeners
		parentDiv.addEventListener("click", deleteClip);
		contentDiv.addEventListener("click", selectValue);
	});
}
function deleteClip(event) {
	if (event.target.tagName === "SPAN") {
		let target = event.target.parentElement;
		clips = clips.filter((clip) => !(target.dataset.id == clip.id));
		localStorage.setItem("clipArr", JSON.stringify(clips));
		viewClips(clips);
	}
}
function selectValue(event) {
	var range = document.createRange();
	range.selectNode(event.target);
	window.getSelection().removeAllRanges(); // clear current selection
	window.getSelection().addRange(range); // to select text
	document.execCommand("copy");
	//window.getSelection().removeAllRanges(); // to deselect
	setTimeout(addCopied, 0);
	setTimeout(removeCopied, 2000);
	function addCopied() {
		event.target.innerText = "Copied!";
		event.target.style.color = "#0A4DC8";
		event.target.style.padding = "20px 0";
		event.target.style.fontWeight = "600";
		event.target.style.fontSize = "1.5rem";
	}
	function removeCopied() {
		viewClips(clips);
	}
}
function searchClips(event) {
	if (event.keyCode === 13 && event.target.value.trim() != "") {
		let searchTitle = event.target.value;
		let searched = clips.filter((clip) => clip.title == searchTitle);
		viewClips(searched);
	} else {
		viewClips(clips);
	}
}

viewClips(clips);

textArea.addEventListener("keydown", createClips);
