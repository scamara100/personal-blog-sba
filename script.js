const personalBlogForm = document.getElementById("personalBlogForm")
const titleInput = document.getElementById("title")
const contentInput = document.getElementById("content")
const titleSpan = document.getElementById("titleSpan")
const contentSpan = document.getElementById("contentSpan")
const list = document.getElementById("list")
const cart = []
let removeButton;


personalBlogForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const post = {
        title: titleInput.value.trim(),
        content: contentInput.value.trim()
    }



    if (title === "" | content === "") {
        alert("Please fill out all the fields")
        return
    }

    if (!title.validity.valid) {
        title.setCustomvalidity("Please enter the title");
        titleSpan.textContent = title.validationMessage
        title.focus()
        return;
    }
    if (!content.validity.valid) {
        content.setCustomvalidity("Please enter a content")
        contentSpan.textContent = content.validationMessage
        content.focus()
        return;
    }
})