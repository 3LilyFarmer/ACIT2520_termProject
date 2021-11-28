document.getElementById("files").addEventListener("change", (ev) => {
    ev.preventDefault();
    const formdata = new FormData();
    formdata.append("files", ev.target.files[0]);
    fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formdata,
    })
    .then(data => console.log(data))
    .catch(error => console.log(error))
});