<<<<<<< HEAD
let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
=======
let allTasks = [];
>>>>>>> 005bfb7a9892b046c8e724eba35a7a6e384ce36c
let valueInput = "";
let input = null;
let indexEdit = null;

window.onload = init = async () => {
  input = document.getElementById("add-task");
  input.addEventListener("change", updateValue);
  input.placeholder = "Input task";
  const response = await fetch("http://localhost:8000/allTasks", {
    method: "GET",
  });
  const result = await response.json();
<<<<<<< HEAD
=======
  console.log(result);
>>>>>>> 005bfb7a9892b046c8e724eba35a7a6e384ce36c
  allTasks = result.data;
  render();
}

const onClickButon = async () => {
  const response = await fetch("http://localhost:8000/createTask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      text: valueInput,
      isCheck: false,
    })
  });
  const result = await response.json();
  allTasks = result.data;
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  valueInput = "";
  input.value = "";
  render();
};

const updateValue = (event) => {
  valueInput = event.target.value;
}

const render = () => {
  const content = document.getElementById("content-page");
  allTasks.sort((a, b) => a.isCheck - b.isCheck);

  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
  allTasks.map((item, index) => {
    const container = document.createElement("div");
    container.id = `task-${index}`;
    container.className = "task-container";

    const checkbox = document.createElement("input");
    checkbox.className = "checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = item.isCheck;

    checkbox.onchange = () => {
      onChangeCheckBox(index);
    };

    container.appendChild(checkbox);

    if (indexEdit === index) {
      const text = document.createElement("input");
      text.type = "text";
      text.className = "correct-task";
      text.id = "add-correction";
      text.value = item.text;
      container.appendChild(text);

      const saveButton = document.createElement("input");
      saveButton.className = "button";
      saveButton.type = "image";
<<<<<<< HEAD
      saveButton.src = "save.png";
=======
      saveButton.src = "img/save.png";
>>>>>>> 005bfb7a9892b046c8e724eba35a7a6e384ce36c
      container.appendChild(saveButton);

      saveButton.onclick = async () => {
        input1 = document.getElementById("add-correction");
        input1.addEventListener("change", updateValue);
        const response = await fetch("http://localhost:8000/updateTask", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
<<<<<<< HEAD
            id: allTasks[index].id,
=======
            _id: allTasks[index]._id,
>>>>>>> 005bfb7a9892b046c8e724eba35a7a6e384ce36c
            text: input1.value,
          }),
        });
        const result = await response.json();
        allTasks = result.data;
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        indexEdit = null;
        render();
      };

      const cancelButton = document.createElement("input");
      cancelButton.className = "button";
      cancelButton.type = "image";
<<<<<<< HEAD
      cancelButton.src = "cancel.png";
=======
      cancelButton.src = "img/cancel.png";
>>>>>>> 005bfb7a9892b046c8e724eba35a7a6e384ce36c
      container.appendChild(cancelButton);

      cancelButton.onclick = () => {
        indexEdit = null;
        render();
      };
    } else {
      const text = document.createElement("p");
      text.innerText = item.text;
      text.className = `text-task ${item.isCheck ? "done-text" : ""}`;
      container.appendChild(text);
    }

    const buttonDelete = document.createElement("input");
    buttonDelete.className = "button";
    buttonDelete.type = "image";
<<<<<<< HEAD
    buttonDelete.src = "del.png";
=======
    buttonDelete.src = "img/del.png";
>>>>>>> 005bfb7a9892b046c8e724eba35a7a6e384ce36c
    if (indexEdit !== index) container.appendChild(buttonDelete);

    buttonDelete.onclick = () => {
      deleteTasks(index);
    };

    const buttonEdit = document.createElement("input");
    buttonEdit.className = "button";
    buttonEdit.type = "image";
<<<<<<< HEAD
    buttonEdit.src = "edit.png";
=======
    buttonEdit.src = "img/edit.png";
>>>>>>> 005bfb7a9892b046c8e724eba35a7a6e384ce36c
    if (indexEdit !== index) container.appendChild(buttonEdit);
    if (indexEdit !== index && item.isCheck) buttonEdit.disabled = true;

    buttonEdit.onclick = () => {
      indexEdit = index;
      render();
    };

    content.appendChild(container);
  });
};

const onChangeCheckBox = async (index) => {
  allTasks[index].isCheck = !allTasks[index].isCheck;
<<<<<<< HEAD
  const {id, isCheck} = allTasks[index];
=======
  const {_id, isCheck} = allTasks[index];
>>>>>>> 005bfb7a9892b046c8e724eba35a7a6e384ce36c
  const response = await fetch("http://localhost:8000/updateTask", {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
<<<<<<< HEAD
      id, isCheck
=======
      _id, isCheck
>>>>>>> 005bfb7a9892b046c8e724eba35a7a6e384ce36c
    })			
  });
  const result = await response.json();
  allTasks = result.data;
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  render();
};

const deleteTasks = async (index) => {
<<<<<<< HEAD
  const response = await fetch(`http://localhost:8000/deleteTask?id=${allTasks[index].id}`, {
=======
  const response = await fetch(`http://localhost:8000/deleteTask?_id=${allTasks[index]._id}`, {
>>>>>>> 005bfb7a9892b046c8e724eba35a7a6e384ce36c
      method: "DELETE",
    });
  const result = await response.json();
  allTasks = result.data;
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  render();
};

const dellAllTasks = () => {
  allTasks = [];
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  render();
};