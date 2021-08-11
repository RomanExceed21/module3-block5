let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
let valueInput = "";
let input = null;
let indexEdit = null;

window.onload = async function init() {
  input = document.getElementById("add-task");
  input.addEventListener("change", updateValue);
  input.placeholder = "Input task";
  const response = await fetch("http://localhost:8000/allTasks", {
    method: "GET",
  });
  const result = await response.json();
  allTasks = result.data;
	console.log(allTasks);
  render();
};

const onClickButon = async () => {
  allTasks.push({
    text: valueInput,
    isCheck: false
  });
	const response = await fetch("http://localhost:8000/createTask", {
    method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			'Access-Control-Allow-Origin': '*'
		},
		body: JSON.stringify({
			text: valueInput,
    	isCheck: false
		})
  });
	let result = await response.json();
	allTasks = result.data;
	console.log(allTasks);
	localStorage.setItem("tasks", JSON.stringify(allTasks));
  valueInput = "";
  input.value = "";
  render();
};

updateValue = (event) => {
  valueInput = event.target.value;
};

render = () => {
  const content = document.getElementById("content-page");

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
    checkbox.checked = item.isChek;

    checkbox.onchange = function () {
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
      saveButton.src = "save.png";
      container.appendChild(saveButton);

      saveButton.onclick = async () => {
        input1 = document.getElementById("add-correction");
        input1.addEventListener("change", updateValue);
        allTasks[index].text = input1.value;
				console.log(input1.value)
				console.log(allTasks);
				const response = await fetch("http://localhost:8000/updateTask", {
    			method: 'PATCH',
					headers: {
						'Content-Type': 'application/json;charset=utf-8',
						'Access-Control-Allow-Origin': '*'
					},
					body: JSON.stringify({
						id: allTasks[index].id,
						text: input1.value,
						isCheck: false
					})			
  			});
				let result = await response.json();
				allTasks = result.data;
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        indexEdit = null;
        render();
      };

      const cancelButton = document.createElement("input");
      cancelButton.className = "button";
      cancelButton.type = "image";
      cancelButton.src = "cancel.png";
      container.appendChild(cancelButton);

      cancelButton.onclick = function () {
        indexEdit = null;
        render();
      };
    } else {
      const text = document.createElement("p");
      text.innerText = item.text;
      text.className = item.isChek ? "text-task done-text" : "text-task";
      container.appendChild(text);
    }

    const buttonDelete = document.createElement("input");
    buttonDelete.className = "button";
    buttonDelete.type = "image";
    buttonDelete.src = "del.png";
    if (indexEdit !== index) container.appendChild(buttonDelete);

    buttonDelete.onclick = function () {
      deleteTasks(index);
    };

    const buttonEdit = document.createElement("input");
    buttonEdit.className = "button";
    buttonEdit.type = "image";
    buttonEdit.src = "edit.png";
    if (indexEdit !== index) container.appendChild(buttonEdit);
    if (indexEdit !== index && item.isChek === true) buttonEdit.disabled = true;

    buttonEdit.onclick = function () {
      indexEdit = index;

      render();
    };

    content.appendChild(container);
  });
};

const onChangeCheckBox = (index) => {
  allTasks[index].isChek = !allTasks[index].isChek;
  allTasks.push(allTasks[index]);
  allTasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  render();
};

const deleteTasks = async (index) => {
	console.log(allTasks[index].id, index)
	const response = await fetch(`http://localhost:8000/deleteTask?id=${allTasks[index].id}`, {
    method: 'DELETE'
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
