<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Sistema Jurídico</title>

  <!-- Fonte & Icons -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

  <!-- jsPDF -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

  <style>
    :root{
      --bg:#071029;
      --accent1:#6d28d9;
      --accent2:#4f46e5;
      --muted:#94a3b8;
      --card-bg: rgba(255,255,255,0.02);
      --white:#ffffff;
      --success:#10b981;
      --warning:#f59e0b;
    }
    *{box-sizing:border-box}
    body{margin:0;min-height:100vh;font-family:'Inter',sans-serif;background:var(--bg);color:var(--white)}
    .app{display:flex;height:100vh;overflow:hidden}

/* SIDEBAR */
    .sidebar{
      width:240px;padding:22px 14px;background:linear-gradient(180deg,#07102a,#0c1226);display:flex;flex-direction:column;gap:18px;border-right:1px solid rgba(255,255,255,0.03)
    }
    .brand{display:flex;align-items:center;gap:12px;padding-bottom:6px;border-bottom:1px solid rgba(255,255,255,0.03)}
    .logo{width:46px;height:46px;border-radius:10px;background:linear-gradient(135deg,var(--accent1),var(--accent2));display:flex;align-items:center;justify-content:center;font-weight:700}
    .brand h3{margin:0;font-size:15px}
    .brand p{margin:0;font-size:12px;color:var(--muted)}
    nav{display:flex;flex-direction:column;gap:8px;margin-top:10px}
    .nav-btn{display:flex;align-items:center;gap:12px;padding:12px;border-radius:10px;border:none;background:transparent;color:var(--white);cursor:pointer;font-weight:600;transition:all .18s}
    .nav-btn:hover{background:rgba(255,255,255,0.02);transform:translateY(-2px)}
    .nav-btn.active{background:linear-gradient(90deg,#1f1147, rgba(79,70,229,0.12));box-shadow:0 8px 24px rgba(79,70,229,0.12)}

    .sidebar-footer{margin-top:auto;display:flex;flex-direction:column;gap:8px;color:var(--muted);font-size:13px}

/* WORKSPACE */
    .workspace{flex:1;display:flex;flex-direction:column;min-width:0}
    .topbar{height:64px;display:flex;align-items:center;justify-content:space-between;padding:0 22px;border-bottom:1px solid rgba(255,255,255,0.03);background:linear-gradient(90deg, rgba(255,255,255,0.02), transparent)}
    .page-title{font-size:18px;font-weight:600}
    .user-area{display:flex;align-items:center;gap:12px}
    .main-area{padding:18px;overflow:auto;height:calc(100vh - 64px)}
    .container{background:var(--card-bg);border-radius:12px;padding:18px;border:1px solid rgba(255,255,255,0.03);box-shadow:0 8px 30px rgba(2,6,23,0.45)}
    .grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
    .col-full{grid-column:1/-1}
    label{display:block;margin-top:10px;color:var(--muted);font-weight:600}
    input,select,textarea{width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.05);background:transparent;color:var(--white)}
    textarea{min-height:100px;resize:vertical}
    .actions{display:flex;gap:10px;align-items:center;margin-top:14px}
    .btn{display:inline-flex;align-items:center;gap:10px;padding:10px 14px;border-radius:10px;border:none;cursor:pointer;font-weight:600}
    .btn.primary{background:linear-gradient(90deg,var(--accent1),var(--accent2));color:#fff;box-shadow:0 8px 26px rgba(79,70,229,0.18)}
    .btn.ghost{background:transparent;border:1px solid rgba(255,255,255,0.04);color:var(--white)}
    .btn.link{background:transparent;color:var(--muted);text-decoration:underline;padding:8px}
    .case-card{background:rgba(255,255,255,0.02);padding:12px;border-radius:8px;border-left:4px solid var(--accent2);margin-bottom:12px}
    .status-chip{padding:6px 8px;border-radius:8px;font-weight:700}
    .status-active{background:rgba(16,185,129,0.12);color:var(--success);border:1px solid rgba(16,185,129,0.12)}
    .status-finished{background:rgba(249,115,22,0.08);color:var(--warning);border:1px solid rgba(249,115,22,0.08)}
    table{width:100%;border-collapse:collapse;margin-top:12px;color:var(--white)}
    th,td{padding:8px;border-bottom:1px solid rgba(255,255,255,0.03);text-align:left;font-size:14px}
    th{color:var(--muted);font-weight:600}
    .search-row{display:flex;gap:8px;align-items:center;margin-bottom:12px}
    .no-data{color:var(--muted);padding:18px}
    .controls-right{display:flex;gap:8px;align-items:center}

/* responsive */
    @media (max-width:980px){.grid{grid-template-columns:1fr}.sidebar{width:64px}.brand h3,.brand p,.nav-btn .label{display:none}}
    @media (max-width:640px){.topbar{padding:0 10px}.main-area{padding:12px}}
  </style>
</head>
<body>
  <div class="app">
    <!-- SIDEBAR -->
    <aside class="sidebar" aria-label="menu lateral">
      <div class="brand">
        <div class="logo">JÚ</div>
        <div>
          <h3>Sistema Jurídico</h3>
          <p>Gestão de Processos</p>
        </div>
      </div>

      <nav>
        <button class="nav-btn active" data-tab="cadastro"><span class="material-icons">person_add</span><span class="label">Cadastro</span></button>
        <button class="nav-btn" data-tab="lista"><span class="material-icons">folder_open</span><span class="label">Processos</span></button>
        <button class="nav-btn" data-tab="relatorios"><span class="material-icons">analytics</span><span class="label">Relatórios</span></button>
      </nav>

      <div class="sidebar-footer">
        <div><strong>Planilha:</strong></div>
        <div style="word-break:break-all;color:var(--muted);font-size:13px">docs.google.com/spreadsheets/d/1wU3D0kSBjAB_lIKKi1fUP9LZJK8pto2l7byvZBwucOM</div>
      </div>
    </aside>

    <!-- WORKSPACE -->
    <div class="workspace">
      <div class="topbar">
        <div class="page-title" id="pageTitle">Cadastro</div>
        <div class="user-area">
          <div style="text-align:right">
            <div id="userName" style="font-weight:600">Sem Login</div>
            <div style="font-size:12px;color:var(--muted)">Offline mode</div>
          </div>
          <div class="avatar" style="width:44px;height:44px;border-radius:8px;background:linear-gradient(135deg,var(--accent1),var(--accent2));display:flex;align-items:center;justify-content:center;font-weight:700">⚖️</div>
        </div>
      </div>

      <div class="main-area">
        <!-- CADASTRO -->
        <div id="cadastro" class="container tab" style="display:block">
          <h2>Cadastro de Cliente & Processo</h2>

          <form id="formCadastro" style="margin-top:12px">
            <div class="grid">
              <div>
                <label>Nome completo</label>
                <input name="Nome" type="text" required placeholder="Ex: José da Silva">

                <label>CPF</label>
                <input name="CPF" type="text" placeholder="000.000.000-00">

                <label>RG</label>
                <input name="RG" type="text" placeholder="">
              </div>

              <div>
                <label>Telefone / WhatsApp</label>
                <input name="Telefone" type="text" placeholder="(11) 9xxxx-xxxx">

                <label>E-mail</label>
                <input name="Email" type="email" placeholder="exemplo@dominio.com">

                <label>Responsável (advogado)</label>
                <input name="Responsavel" type="text" placeholder="Adv. Fulano">
              </div>

              <div class="col-full">
                <label>Endereço</label>
                <input name="Endereço" type="text" placeholder="Rua, nº, bairro, cidade - UF">
              </div>

              <div>
                <label>Categoria do processo</label>
                <select name="Categoria">
                  <option value="">Selecione...</option>
                  <option value="Cível">Cível</option>
                  <option value="Trabalhista">Trabalhista</option>
                  <option value="Penal">Penal</option>
                  <option value="Família">Família</option>
                  <option value="Consumidor">Consumidor</option>
                  <option value="Outros">Outros</option>
                </select>

                <label>Número do processo</label>
                <input name="Número" type="text" placeholder="0001234-56.2025.8.26.0000">
              </div>

              <div>
                <label>Vara / Comarca</label>
                <input name="Vara" type="text" placeholder="Ex: 3ª Vara Cível de São Paulo">

                <label>Parte Contrária</label>
                <input name="Parte" type="text" placeholder="Nome da parte contrária">
              </div>

              <div>
                <label>Status</label>
                <select name="Status">
                  <option value="Em andamento">Em andamento</option>
                  <option value="Finalizado">Finalizado</option>
                </select>

                <label>Data de abertura</label>
                <input name="DataAbertura" type="date">
              </div>

              <div>
                <label>Valor da causa (R$)</label>
                <input name="Valor" type="number" step="0.01" placeholder="0.00">

                <label>Honorários (R$)</label>
                <input name="Honorarios" type="number" step="0.01" placeholder="0.00">
              </div>

              <div class="col-full">
                <label>Observações / Anotações</label>
                <textarea name="Observações" placeholder="Anotações importantes, prazos, lembretes..."></textarea>
              </div>
            </div>

            <div class="actions">
              <button class="btn primary" type="submit"><span class="material-icons">save</span> Salvar (Planilha)</button>

              <button type="button" class="btn ghost" id="btnExportPdf"><span class="material-icons">picture_as_pdf</span> Exportar PDF (visualizar)</button>

              <button type="button" class="btn link" id="btnOpenSheet">Abrir Planilha</button>
            </div>
          </form>
        </div>

        <!-- LISTA DE PROCESSOS -->
        <div id="lista" class="container tab" style="display:none">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <h2>Processos Registrados</h2>
            <div style="display:flex;gap:10px;align-items:center">
              <input id="searchInput" placeholder="Pesquisar por nome, CPF, número ou categoria" style="padding:8px;border-radius:8px;border:1px solid rgba(255,255,255,0.03);background:transparent;color:var(--white);min-width:260px">
              <div class="controls-right">
                <button class="btn ghost" id="btnRefresh">Atualizar</button>
                <button class="btn ghost" id="btnDownloadCsv">Baixar CSV (filtrado)</button>
                <button class="btn ghost" id="btnSortDate">Ordenar por Data ↓</button>
              </div>
            </div>
          </div>

          <div id="tableWrapper" style="margin-top:12px">
            <div class="no-data">Carregando registros...</div>
          </div>
        </div>

        <!-- RELATÓRIOS -->
        <div id="relatorios" class="container tab" style="display:none">
          <h2>Relatórios</h2>
          <p style="color:var(--muted)">Em breve: filtros por categoria, status, exportações e gráficos.</p>
        </div>
      </div>
    </div>
  </div>

<script>
/* ===========================
   CONFIGURAÇÃO (seu endpoint)
   =========================== */
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzrWzlAEW-f93fdVd4mCc-XaI6GlBQ_0luuDA-OV8oslGPfACLi69P7so9o4-YS3Lo2Cw/exec";
const SHEET_CSV = "https://docs.google.com/spreadsheets/d/1wU3D0kSBjAB_lIKKi1fUP9LZJK8pto2l7byvZBwucOM/export?format=csv&gid=0";

/* -----------------------------
   NAVEGAÇÃO LATERAL
   ----------------------------- */
document.querySelectorAll('.nav-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;
    document.querySelectorAll('.tab').forEach(t=> t.style.display = (t.id===tab ? 'block' : 'none'));
    document.getElementById('pageTitle').innerText = tab.charAt(0).toUpperCase() + tab.slice(1);
    if(tab==='lista') loadTable();
  });
});

/* -----------------------------
   Helpers
   ----------------------------- */
function formatNowReadable() {
  const d = new Date();
  const pad = n => String(n).padStart(2,'0');
  return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function toISO(d) {
  if(!d) return '';
  const dt = new Date(d);
  return dt.toISOString();
}
function parseDateFromCell(s) {
  // Accept dd/mm/yyyy hh:mm or ISO
  if(!s) return null;
  if(s.includes('/')) {
    // dd/mm/yyyy hh:mm
    const parts = s.split(' ');
    const date = parts[0].split('/');
    const time = (parts[1] || '00:00').split(':');
    const dd = parseInt(date[0],10), mm = parseInt(date[1],10)-1, yyyy = parseInt(date[2],10);
    const hh = parseInt(time[0]||0,10), min = parseInt(time[1]||0,10);
    return new Date(yyyy,mm,dd,hh,min);
  } else {
    const dt = new Date(s);
    return isNaN(dt.getTime()) ? null : dt;
  }
}

/* -----------------------------
   SALVAR NO GOOGLE SHEETS (Apps Script)
   - adiciona campo DataCriacao (formato dd/mm/yyyy hh:mm)
   ----------------------------- */
const form = document.getElementById('formCadastro');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(form);

  // adiciona DataCriacao (legível) e DataISO (para ordenação se quiser)
  const nowReadable = formatNowReadable();
  fd.append('DataCriacao', nowReadable);
  fd.append('DataISO', new Date().toISOString());

  // campo 'action' incluído caso seu Apps Script identifique
  fd.append('action','salvarProcesso');

  try {
    const res = await fetch(SCRIPT_URL, { method: 'POST', body: fd });
    if (!res.ok) throw new Error('Resposta não OK');
    alert('Registro enviado para a planilha!');
    form.reset();
    // atualiza tabela (vai buscar CSV)
    loadTable();
  } catch (err) {
    console.error(err);
    alert('Erro ao salvar na planilha. Verifique o Apps Script e permissões (CORS).');
  }
});

/* -----------------------------
   EXPORTAR PARA PDF (nova aba para visualização)
   ----------------------------- */
document.getElementById('btnExportPdf').addEventListener('click', () => {
  const fd = new FormData(form);
  const obj = {};
  for(const [k,v] of fd.entries()) obj[k]=v;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit:'pt', format:'a4' });
  const margin = 40;
  let y = 40;

  doc.setFontSize(16);
  doc.setFont('Helvetica','bold');
  doc.text('Ficha de Processo', margin, y);
  y += 24;
  doc.setFontSize(10);
  doc.setFont('Helvetica','normal');
  doc.text(`Gerado em: ${formatNowReadable()}`, margin, y);
  y += 18;

  const addLine = (label, value) => {
    doc.setFont('Helvetica','bold');
    doc.text(`${label}:`, margin, y);
    const labelW = doc.getTextWidth(`${label}: `);
    doc.setFont('Helvetica','normal');
    const text = String(value || '-');
    const split = doc.splitTextToSize(text, 520 - labelW);
    doc.text(split, margin + labelW + 4, y);
    y += split.length * 12 + 8;
    if(y > 750) { doc.addPage(); y = 40; }
  };

  addLine('Nome', obj['Nome']);
  addLine('CPF', obj['CPF']);
  addLine('RG', obj['RG']);
  addLine('Telefone', obj['Telefone']);
  addLine('E-mail', obj['Email']);
  addLine('Responsável', obj['Responsavel']);
  addLine('Endereço', obj['Endereço']);
  addLine('Categoria', obj['Categoria']);
  addLine('Número do Processo', obj['Número']);
  addLine('Vara', obj['Vara']);
  addLine('Parte Contrária', obj['Parte']);
  addLine('Status', obj['Status']);
  addLine('Data de Abertura', obj['DataAbertura']);
  addLine('Valor da Causa', obj['Valor']);
  addLine('Honorários', obj['Honorarios']);
  addLine('Observações', obj['Observações']);
  addLine('Data Criacao', obj['DataCriacao'] || '');

  const blobUrl = doc.output('bloburl');
  window.open(blobUrl, '_blank');
});

/* -----------------------------
   ABRIR PLANILHA
   ----------------------------- */
document.getElementById('btnOpenSheet').addEventListener('click', () => {
  window.open('https://docs.google.com/spreadsheets/d/1wU3D0kSBjAB_lIKKi1fUP9LZJK8pto2l7byvZBwucOM', '_blank');
});

/* -----------------------------
   TABELA, BUSCA, ORDENAÇÃO e DOWNLOAD CSV
   ----------------------------- */
const tableWrapper = document.getElementById('tableWrapper');
const searchInput = document.getElementById('searchInput');
const btnRefresh = document.getElementById('btnRefresh');
const btnDownloadCsv = document.getElementById('btnDownloadCsv');
const btnSortDate = document.getElementById('btnSortDate');

let currentRows = []; // JSON array of sheet rows
let sortDesc = true;  // toggle for date sort

btnRefresh.addEventListener('click', () => loadTable(searchInput.value.trim()));
searchInput && searchInput.addEventListener('input', () => loadTable(searchInput.value.trim()));

// download CSV of currently filtered rows
btnDownloadCsv.addEventListener('click', () => {
  if(!currentRows || !currentRows.length){ alert('Nenhum registro para exportar.'); return; }
  // create CSV
  const cols = Object.keys(currentRows[0]);
  const csv = [cols.join(',')].concat(
    currentRows.map(r => cols.map(c => `"${(r[c]||'').replace(/"/g,'""')}"`).join(','))
  ).join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `processos_filtrados_${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

// toggle sort by DataCriacao (desc/asc)
btnSortDate.addEventListener('click', () => {
  sortDesc = !sortDesc;
  btnSortDate.innerText = `Ordenar por Data ${sortDesc ? '↓' : '↑'}`;
  loadTable(searchInput.value.trim());
});

// load table from sheet CSV
async function loadTable(filter = '') {
  tableWrapper.innerHTML = '<div class="no-data">Carregando registros...</div>';
  try {
    const res = await fetch(SHEET_CSV);
    if (!res.ok) throw new Error('Erro ao buscar CSV');
    const csvText = await res.text();
    const rows = parseCSV(csvText);
    if(rows.length < 2) { tableWrapper.innerHTML = '<div class="no-data">Planilha vazia.</div>'; return; }
    const headers = rows[0].map(h => h.trim());
    const data = rows.slice(1).map(r => {
      const obj = {};
      headers.forEach((h,i) => obj[h] = r[i] || '');
      return obj;
    });

    // enrich with Date object parsed from DataCriacao or DataISO
    data.forEach(d => {
      let dt = null;
      if (d['DataISO']) dt = parseDateFromCell(d['DataISO']);
      if (!dt && d['DataCriacao']) dt = parseDateFromCell(d['DataCriacao']);
      d.__date = dt || null;
    });

    // apply filter
    const f = filter.toLowerCase();
    let filtered = f ? data.filter(d =>
      (d['Nome'] && d['Nome'].toLowerCase().includes(f)) ||
      (d['CPF'] && d['CPF'].toLowerCase().includes(f)) ||
      (d['Número'] && d['Número'].toLowerCase().includes(f)) ||
      (d['Categoria'] && d['Categoria'].toLowerCase().includes(f))
    ) : data;

    // sort by date if available
    filtered.sort((a,b) => {
      const da = a.__date ? a.__date.getTime() : 0;
      const db = b.__date ? b.__date.getTime() : 0;
      return sortDesc ? db - da : da - db;
    });

    currentRows = filtered; // keep for CSV download

    if(!filtered.length) { tableWrapper.innerHTML = '<div class="no-data">Nenhum registro encontrado.</div>'; return; }

    // build table
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const cols = ['DataCriacao','Nome','Número','Categoria','Status','Vara','Valor','Observações'];
    cols.forEach(c => {
      const th = document.createElement('th');
      th.textContent = c === 'DataCriacao' ? 'Criado em' : c;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    filtered.forEach(item => {
      const tr = document.createElement('tr');
      // DataCriacao
      const tdDate = document.createElement('td'); tdDate.textContent = item['DataCriacao'] || item['DataISO'] || '-'; tr.appendChild(tdDate);
      // Nome
      const tdNome = document.createElement('td'); tdNome.textContent = item['Nome'] || '-'; tr.appendChild(tdNome);
      // Número
      const tdNum = document.createElement('td'); tdNum.textContent = item['Número'] || '-'; tr.appendChild(tdNum);
      // Categoria
      const tdCat = document.createElement('td'); tdCat.textContent = item['Categoria'] || '-'; tr.appendChild(tdCat);
      // Status badge
      const tdStatus = document.createElement('td'); const span = document.createElement('span');
      span.className = 'status-chip ' + ((item['Status']||'').toLowerCase().includes('final') ? 'status-finished' : 'status-active');
      span.textContent = item['Status'] || '-'; tdStatus.appendChild(span); tr.appendChild(tdStatus);
      // Vara
      const tdVara = document.createElement('td'); tdVara.textContent = item['Vara'] || '-'; tr.appendChild(tdVara);
      // Valor
      const tdValor = document.createElement('td'); tdValor.textContent = item['Valor'] || '-'; tr.appendChild(tdValor);
      // Observações
      const tdObs = document.createElement('td'); tdObs.textContent = (item['Observações']||'').slice(0,120); tr.appendChild(tdObs);

      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    tableWrapper.innerHTML = ''; tableWrapper.appendChild(table);

  } catch (err) {
    console.error(err);
    tableWrapper.innerHTML = '<div class="no-data">Erro ao carregar registros. Verifique se a planilha está pública "Qualquer pessoa com o link pode visualizar".</div>';
  }
}

/* -----------------------------
   CSV parser robustinho
   ----------------------------- */
function parseCSV(text) {
  const rows = [];
  let cur = '';
  let row = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i+1];
    if (ch === '"') {
      if (inQuotes && next === '"') { cur += '"'; i++; } else inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      row.push(cur); cur = '';
    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (cur !== '' || row.length > 0) { row.push(cur); rows.push(row); row = []; cur = ''; }
      if (ch === '\r' && next === '\n') i++;
    } else cur += ch;
  }
  if (cur !== '' || row.length > 0) { row.push(cur); rows.push(row); }
  return rows.map(r => r.map(c => c.trim()));
}

/* -----------------------------
   Inicializar (carrega tabela ao abrir)
   ----------------------------- */
loadTable();

</script>
</body>
</html>
