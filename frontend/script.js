const API = "http://localhost:3000";

// Verifica se o usuário está logado
if (!sessionStorage.getItem("usuario")) {
  window.location.href = "login.html";
}

/* CRIAR TAREFA */
function criarTarefa() {
  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;

  fetch(API + "/tarefas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      titulo,
      descricao,
      status: "pendente"
    })
  })
  .then(() => {
    carregarTarefas();
  });
}

/* CARREGAR TAREFAS */
function carregarTarefas() {
  fetch(API + "/tarefas")
    .then(res => res.json())
    .then(tarefas => {
      
      document.getElementById("pendente").innerHTML = "";
      document.getElementById("andamento").innerHTML = "";
      document.getElementById("finalizado").innerHTML = "";

      tarefas.forEach(tarefa => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
          <b>${tarefa.titulo}</b><br>
          ${tarefa.descricao}<br>
          <button onclick="mudarStatus(${tarefa.id}, 'andamento')">Andamento</button>
          <button onclick="mudarStatus(${tarefa.id}, 'finalizado')">Finalizar</button>
        `;

        if (tarefa.status === "pendente") {
          document.getElementById("pendente").appendChild(div);
        } else if (tarefa.status === "andamento") {
          document.getElementById("andamento").appendChild(div);
        } else {
          document.getElementById("finalizado").appendChild(div);
        }
      });
    });
}

/* MUDAR STATUS */
function mudarStatus(id, status) {
  fetch(API + "/tarefas/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  })
  .then(() => carregarTarefas());
}

/* FUNÇÃO LOGOUT */
function logout() {
  sessionStorage.removeItem("usuario");
  window.location.href = "login.html";
}

/* CARREGA AUTOMATICAMENTE */
carregarTarefas();