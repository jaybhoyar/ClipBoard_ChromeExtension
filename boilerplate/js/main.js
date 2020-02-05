// You js goes here
let textArea = document.querySelector(".text_input");
let search = document.querySelector(".search");
let texttitle = document.querySelector(".text_input_title");
let container = document.querySelector(".container_2");
let clips = JSON.parse(localStorage.getItem("clipArr")) || [];
let id = Date.now();
let gSearch = document.getElementById("the_search_box");

function createClips(event) {
	if (
		event.keyCode == 13 &&
		event.target.value.trim() != "" &&
		texttitle.value.trim() != ""
	) {
		console.log(event.target.value, texttitle.value);
		const clip = {
			title: texttitle.value,
			content: event.target.value,
			id: ++id
		};
		clips.push(clip);
		localStorage.setItem("clipArr", JSON.stringify(clips));
		event.target.value = "";
		texttitle.value = "";
		clips = JSON.parse(localStorage.getItem("clipArr"));
		viewClips(clips);
	}
}
function viewClips(clipsArr) {
	container.innerHTML = "";
	clipsArr.forEach(clip => {
		let parentDiv = document.createElement("div");
		let titleDiv = document.createElement("div");
		let contentDiv = document.createElement("div");
		let titleP = document.createElement("p");
		let spanX = document.createElement("span");
		spanX.classList.add("spanX");
		spanX.textContent = "X";
		titleDiv.classList.add("title_styles");
		contentDiv.classList.add("content_styles");
		parentDiv.setAttribute("data-id", clip.id);
		parentDiv.classList.add("show_clip", "show_clip_header");
		parentDiv.draggable = "true";
		titleP.innerText = clip.title;
		contentDiv.innerText = clip.content;
		titleDiv.append(titleP, spanX);
		parentDiv.append(titleDiv, contentDiv);
		container.append(parentDiv);
		spanX.addEventListener("click", deleteClip);
		contentDiv.addEventListener("click", selectValue);
	});
}
function deleteClip(event) {
	let target = event.target.parentElement;
	// console.log(target.parentElement);
	clips = clips.filter(clip => !(target.parentElement.dataset.id == clip.id));
	localStorage.setItem("clipArr", JSON.stringify(clips));
	viewClips(clips);
}
function selectValue(event) {
	// console.log(event.target.innerHTML);
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
		// // event.target.innerText = text;
		viewClips(clips);
		// event.target.style.fontWeight = "400";
		// // event.target.style.fontSize = "1rem";
		// // event.target.style.color = "#000";
	}
}
function searchClips(event) {
	if (event.target.value != "") {
		let searchWord = event.target.value.toLowerCase();
		debugger;
		let searchedArr = clips.filter(clip =>
			clip.title.toLowerCase().includes(searchWord)
		);
		viewClips(searchedArr);
	} else {
		viewClips(clips);
	}
}
function GoogleSearch(event) {
	if (event.keyCode === 13) {
		var box = document.getElementById("the_search_box");
		window.location.href =
			"http://www.google.com/search?q=" + escape(box.value);
	}
}
// function randomColor() {
// 	let words = "ABCDEF0123456789".split("");
// 	let color = "#";
// 	for (i = 0; i < 6; i++) {
// 		color += words[Math.floor(Math.random() * 16)];
// 	}
// 	return color;
// }
viewClips(clips);

// document.querySelector("body").style.backgroundColor = randomColor();
// viewClips(clips);
// textArea.addEventListener("keydown", createClips);
textArea.addEventListener("keydown", createClips);
search.addEventListener("keydown", searchClips);
gSearch.addEventListener("keydown", GoogleSearch);

//
//  copy
