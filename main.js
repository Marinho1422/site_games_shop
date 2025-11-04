document.addEventListener('DOMContentLoaded', function () {
  // ---------- Utilidades ----------
  const $ = sel => document.querySelector(sel);

  function showMessage(text, color) {
    const msg = document.createElement('div');
    msg.textContent = text;
    msg.style.cssText = `
      position: fixed;
      top: 100px;
      left: 50%;
      transform: translateX(-50%);
      background: ${color};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      z-index: 1001;
      max-width: 90%;
      text-align: center;
      font-weight: bold;
    `;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3500);
  }

  // ---------- Botões principais (index.html) ----------
  const btnQuote = $('#btn-quote');
  const btnSchedule = $('#btn-schedule');
  const btnLearn = $('#btn-learn');

  if (btnQuote) btnQuote.addEventListener('click', () => showMessage('Funcionalidade de cotação em breve!', '#602468'));
  if (btnLearn) btnLearn.addEventListener('click', () => showMessage('Mais informações em breve!', '#ef303f'));
  if (btnSchedule) btnSchedule.addEventListener('click', () => (window.location.href = 'agendar.html'));

  // ---------- Formulário de contato (index.html) ----------
  const contactForm = $('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', '#602468');
      contactForm.reset();
    });
  }

  // ---------- Formulário de agendamento ----------
  const form = $('#form-agendar');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // coleta dos dados
      const codigo = $('#codigo-empresa').value.trim();
      const cnpj = $('#cnpj').value.trim();
      const dtCarrega = $('#dt-carregamento').value;
      const dtDescarrega = $('#dt-descarregamento').value;
      const localDesc = $('#local-descarregamento').value.trim();
      const pin = $('#pin').value.trim();
      const senha = $('#senha-unica').value.trim();

      // ---------- Validações ----------

      // Código da empresa: até 5 dígitos numéricos
      if (!/^\d{1,5}$/.test(codigo)) {
        alert("O código da empresa deve conter até 5 dígitos numéricos.");
        return;
      }

      // CNPJ: formato numérico com 14 dígitos (##.###.###/####-##)
      const cnpjLimpo = cnpj.replace(/\D/g, '');
      if (!/^\d{14}$/.test(cnpjLimpo)) {
        alert("O CNPJ deve conter 14 dígitos numéricos (ex: 12.345.678/0001-90).");
        return;
      }

      // Datas e horas
      const agora = new Date();
      const dataCarrega = new Date(dtCarrega);
      const dataDescarrega = new Date(dtDescarrega);

      if (isNaN(dataCarrega) || isNaN(dataDescarrega)) {
        alert("Preencha corretamente as datas e horas.");
        return;
      }

      if (dataCarrega < agora) {
        alert("A data/hora de carregamento não pode ser anterior ao momento atual.");
        return;
      }

      const diffMs = dataDescarrega - dataCarrega;
      const diffMin = diffMs / (1000 * 60);
      if (diffMin < 90) {
        alert("O intervalo entre carregamento e descarregamento deve ser de pelo menos 1 hora e 30 minutos.");
        return;
      }

      // Local do descarregamento: Nome, logradouro, número, bairro, cidade, UF e CEP (mínimo)
      const padraoLocal = /^([^,]+,){4,}[^,]+$/;
      if (!padraoLocal.test(localDesc)) {
        alert("O local do descarregamento deve conter: Nome do destinatário, logradouro, número, bairro, cidade, UF e CEP.");
        return;
      }

      // PIN de confiabilidade: 3 dígitos
      if (!/^\d{3}$/.test(pin)) {
        alert("O PIN de confiabilidade deve conter exatamente 3 dígitos numéricos.");
        return;
      }

      // Senha obrigatória
      if (!senha) {
        alert("A senha única de acesso é obrigatória.");
        return;
      }

      // ---------- Confirmação final ----------
      const confirmar = confirm("Todos os dados estão corretos?");
      if (!confirmar) {
        showMessage("Algo está errado! Favor corrigir.", "#ef303f");
        return;
      }

      // ---------- Sucesso ----------
      showMessage("Seu carregamento foi agendado com sucesso!", "#009432");

      // (opcional) limpar formulário
      form.reset();
    });
  }

  // ---------- Menu mobile ----------
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navEl = document.querySelector('nav');
  if (mobileToggle && navEl) {
    mobileToggle.addEventListener('click', () => {
      navEl.style.display = navEl.style.display === 'block' ? 'none' : 'block';
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) navEl.style.display = '';
    });
  }
});
