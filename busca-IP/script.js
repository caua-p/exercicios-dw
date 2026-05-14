const btn = document.getElementById("btnBuscar");
const input = document.getElementById("ipInput");
const tabela = document.getElementById("tabela");

btn.addEventListener("click", buscarIP);

async function buscarIP() {
    const ip = input.value.trim();

    if (!ip) return;

    try {
        const res = await fetch(`https://ipinfo.io/${ip}/json?token=8412547cee8e51`);
        const data = await res.json();

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${data.ip || '-'}</td>
            <td>${data.org || '-'}</td>
            <td>${data.country || '-'}</td>
            <td>${data.city || '-'}</td>
            <td class="clear-btn">✖</td>
        `;

        linha.querySelector(".clear-btn").addEventListener("click", () => {
            linha.remove();
        });

        tabela.appendChild(linha);

        input.value = "";

    } catch (erro) {
        alert("Erro ao buscar IP");
    }
}
