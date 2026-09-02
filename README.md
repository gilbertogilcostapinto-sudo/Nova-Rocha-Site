# Site — Nova Rocha

Site institucional estático (HTML + CSS + JS puro, sem dependências, sem backend) para o gastropub Nova Rocha.

## Arquivos
- `index.html` — todo o conteúdo e estrutura das seções
- `styles.css` — identidade visual (cores, tipografia, layout)
- `script.js` — status "aberto agora / fechado" em tempo real + envio do formulário de contato por e-mail

## Antes de publicar, ajuste:
1. **Horário de funcionamento real**, dia a dia, no topo de `script.js` (objeto `HORARIO_FUNCIONAMENTO`) e na tabela em `index.html` (seção `#local`). Só tínhamos a informação de que hoje fecha à 00:00 — os demais horários no site são um chute razoável para um boteco/gastropub e precisam de confirmação.
2. **E-mail de contato** em `script.js` (constante `EMAIL_CONTATO`) — hoje está como placeholder.
3. **Cardápio e preços** — os itens e valores foram estimados a partir dos destaques informados (Torresmo Top, Beirute + Coca) e da faixa de preço média (R$ 20–40/pessoa). Revise com o cardápio real do estabelecimento.
4. Se o número (11) 4675-0909 tiver WhatsApp Business, posso trocar o botão "Ligar" por um link direto do WhatsApp (`wa.me`) — hoje o site só usa `tel:` porque não sei se esse número recebe WhatsApp.

## Como publicar
Não precisa de servidor: é um site 100% estático.
- **Mais simples:** arraste a pasta para [Netlify Drop](https://app.netlify.com/drop) ou para o GitHub Pages.
- **Domínio próprio:** suba os 3 arquivos via FTP/cPanel para a raiz do domínio (`novarocha.com.br`, por exemplo).

## Como testar localmente
Abra `index.html` direto no navegador, ou rode um servidor simples:
```bash
python3 -m http.server 8000
```
e acesse `http://localhost:8000`.
