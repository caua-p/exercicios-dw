// Dados iniciais (Baseados na Figura 1)
let ipData = [
    { ip: "192.168.0.10", mask: "255.255.255.0", version: "v4" },
    { ip: "192.168.0.7", mask: "255.255.255.0", version: "v4" },
    { ip: "192.168.0.5", mask: "255.255.255.0", version: "v4" },
    { ip: "192.168.0.1", mask: "255.255.255.0", version: "v4" }
];

let editIndex = null;

const tableBody = document.getElementById('tableBody');
const ipInput = document.getElementById('ipInput');
const maskInput = document.getElementById('maskInput');
const versionInput = document.getElementById('versionInput');
const addBtn = document.getElementById('addBtn');

// Função para renderizar a tabela
function renderTable() {
    tableBody.innerHTML = "";
    
    ipData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.ip}</td>
            <td>${item.mask}</td>
            <td>${item.version}</td>
            <td class="actions">
                <span class="action-icon delete-icon" onclick="deleteIP(${index})">✕</span>
                <span class="action-icon edit-icon" onclick="prepareEdit(${index})">✎</span>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Adicionar ou Salvar Edição
addBtn.addEventListener('click', () => {
    const newIP = {
        ip: ipInput.value.trim(),
        mask: maskInput.value.trim(),
        version: versionInput.value.trim()
    };

    if (!newIP.ip || !newIP.mask || !newIP.version) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Verificar se o IP já existe (validar duplicados)
    const alreadyExists = ipData.some((item, index) => item.ip === newIP.ip && index !== editIndex);
    
    if (alreadyExists) {
        alert("Este endereço IP já foi cadastrado!");
        return;
    }

    if (editIndex !== null) {
        // Modo Edição
        ipData[editIndex] = newIP;
        editIndex = null;
        addBtn.innerText = "Add";
    } else {
        // Modo Adição (insere no topo como na Figura 4)
        ipData.unshift(newIP);
    }

    // Limpar campos e atualizar
    ipInput.value = "";
    maskInput.value = "";
    versionInput.value = "";
    renderTable();
});

// Preparar para editar
window.prepareEdit = (index) => {
    const item = ipData[index];
    ipInput.value = item.ip;
    maskInput.value = item.mask;
    versionInput.value = item.version;
    
    editIndex = index;
    addBtn.innerText = "Salvar";
    ipInput.focus();
};

// Eliminar IP
window.deleteIP = (index) => {
    if(confirm("Tem a certeza que deseja excluir este IP?")) {
        ipData.splice(index, 1);
        renderTable();
    }
};
// Inicializar a tabela
renderTable();