// create a link to the database so that after saving in uploads folder it is also linked into the database user.profile_pic
document.getElementById("file").addEventListener("change", (ev) => {
  ev.preventDefault();
  const formdata = new FormData();
  formdata.append("image", ev.target.files[0]);
  fetch("http://localhost:3000/uploads", {
    method: "POST",
    body: formdata,
  })
    .then((data) => data.json())
    .then((data) => console.log(data));
});