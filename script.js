// ---------------------------------------------------------------
// Nova Rocha — script.js
// 1) Calcula "Aberto agora" / "Fechado" com base no horário abaixo.
// 2) Envia o formulário de contato por e-mail (mailto), sem backend.
//
// >>> AJUSTE AQUI <<<
// Troque o horário e o e-mail de destino pelos dados reais do
// estabelecimento antes de publicar o site.
// ---------------------------------------------------------------

const HORARIO_FUNCIONAMENTO = {
  // 0 = domingo ... 6 = sábado. Horas em formato 24h (minutos desde 00:00).
  0: { abre: 11 * 60, fecha: 23 * 60 },        // domingo
  1: { abre: 11 * 60, fecha: 24 * 60 },        // segunda
  2: { abre: 11 * 60, fecha: 24 * 60 },        // terça
  3: { abre: 11 * 60, fecha: 24 * 60 },        // quarta
  4: { abre: 11 * 60, fecha: 24 * 60 },        // quinta
  5: { abre: 11 * 60, fecha: 25 * 60 },        // sexta (fecha 01:00 do dia seguinte)
  6: { abre: 11 * 60, fecha: 25 * 60 },        // sábado (fecha 01:00 do dia seguinte)
};

const EMAIL_CONTATO = "contato@novarocha.com.br"; // <-- troque pelo e-mail real

function minutosAgora(date){
  return date.getHours() * 60 + date.getMinutes();
}

function estaAberto(date = new Date()){
  const dia = date.getDay();
  const minutosHoje = minutosAgora(date);

  const hoje = HORARIO_FUNCIONAMENTO[dia];
  if (minutosHoje >= hoje.abre && minutosHoje < hoje.fecha) return true;

  // cobre o caso de fechar depois da meia-noite (ex: sexta fecha 01:00)
  const ontem = HORARIO_FUNCIONAMENTO[(dia + 6) % 7];
  if (ontem.fecha > 24 * 60){
    const fechaMadrugada = ontem.fecha - 24 * 60;
    if (minutosHoje < fechaMadrugada) return true;
  }
  return false;
}

function atualizarStatus(){
  const dot = document.getElementById("status-dot");
  const texto = document.getElementById("status-texto");
  if (!dot || !texto) return;

  const aberto = estaAberto();
  dot.classList.toggle("open", aberto);
  dot.classList.toggle("closed", !aberto);
  texto.textContent = aberto ? "Aberto agora" : "Fechado no momento";
}

atualizarStatus();
setInterval(atualizarStatus, 60 * 1000);

// ---------------- formulário de contato ----------------
const form = document.getElementById("form-contato");
if (form){
  form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const pessoas = document.getElementById("pessoas").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    const nota = document.getElementById("form-nota");

    const assunto = encodeURIComponent(`Contato pelo site — ${nome || "cliente"}`);
    const corpo = encodeURIComponent(
      `Nome: ${nome}\n` +
      (pessoas ? `Pessoas: ${pessoas}\n` : "") +
      `Mensagem: ${mensagem}`
    );

    window.location.href = `mailto:${EMAIL_CONTATO}?subject=${assunto}&body=${corpo}`;
    nota.textContent = "Abrindo seu aplicativo de e-mail…";
  });
}
