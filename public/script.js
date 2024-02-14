document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fn = document.querySelector("#fn");
    const ln = document.querySelector("#ln");
    const files = document.querySelector("#files");

    const formData = new FormData();
    formData.append("fn", fn.value);
    formData.append("ln", ln.value);

    for (let i = 0; i < files.files.length; i++) {
      formData.append("files", files.file[i]);
    }

    console.log(...formData);

    async function fetchData() {
      const response = await fetch("http://localhost:3000/uploads", {
        method: POST,
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    }
    fetchData();
  });
});
