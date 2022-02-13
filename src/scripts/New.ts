import "./Modal.js";

const newModal = document.getElementById("newModal")!;
document.getElementById("newModalOpen")!.addEventListener("click", () => {
    newModal.style.display = "flex";
})

const urlInput = document.getElementById("urlInput")!;
urlInput.addEventListener("keypress", (e) => {
    if (e.code !== "Enter") {
        return;
    }
    alert("submit");
})