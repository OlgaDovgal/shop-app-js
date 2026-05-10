import refs from "./refs";

export function openModal() {
    refs.modalEl.classList.add("modal--is-open");
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);
    refs.modalEl.addEventListener("click", onBackDrop);
}
export function closeModal() {
    refs.modalEl.classList.remove("modal--is-open");
    document.body.style.overflow = "";
    window.removeEventListener("keydown", onEscape);
    refs.modalEl.removeEventListener("click", onBackDrop);

}

function onEscape(event) {
    if (event.code === "Escape") {
        closeModal();
    }
}
function onBackDrop(event) {
    if (event.target === event.currentTarget) {
        closeModal();
    }
}