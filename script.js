
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* Mobile nav */
(() => {
  const burger = $('#burger'), links = $('#links');
  const toggle = open => {
    links.classList.toggle('open', open);
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
  };
  burger.addEventListener('click', () => toggle(!links.classList.contains('open')));
  $$('a', links).forEach(a => a.addEventListener('click', () => toggle(false)));
})();

/* Active nav state */
(() => {
  const map = new Map($$('#links a').map(a => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    map.forEach(a => a.classList.remove('on'));
    map.get(e.target.id)?.classList.add('on');
  }), { rootMargin: '-45% 0px -50% 0px' });
  map.forEach((_, id) => { const s = document.getElementById(id); s && io.observe(s); });
})();

/* Occasion selector */
(() => {
  const data = [
    { k: 'زيارة', box: 'بوكس الزيارة', c: 'var(--yel)', d: 'بوكس خفيف وأنيق، مناسب لما تكون داخل على حد ومش عايز تروح بإيد فاضية.' },
    { k: 'تهنئة', box: 'بوكس الحلو', c: 'var(--coral)', d: 'تفصيلة حلوة تقول مبروك من غير كلام كتير.' },
    { k: 'ضيافة', box: 'بوكس القهوة', c: 'var(--sage)', d: 'للبيت اللي دايمًا مفتوح: قهوة وتمر يكملوا جلسة الضيافة.' },
    { k: 'هدية', box: 'البوكس الصغير', c: 'var(--tang)', d: 'تقدير بسيط وشكر في وقته، بتغليف يتقدّم زي ما هو.' },
    { k: 'لَمّة', box: 'بوكس اللَمّة', c: 'var(--yel)', d: 'للقعدة الكبيرة اللي الكل فيها: تشكيلة تكفي الجميع وتفضل في الذاكرة.' }
  ];
  const tabs = $('#occTabs'), panel = $('#occPanel');
  data.forEach((o, i) => {
    const b = document.createElement('button');
    b.role = 'tab'; b.textContent = o.k; b.dataset.i = i;
    tabs.append(b);
  });
  const show = i => {
    const o = data[i];
    $$('button', tabs).forEach((b, j) => b.setAttribute('aria-selected', i === j));
    panel.classList.add('swap');
    setTimeout(() => {
      panel.style.setProperty('--panel', o.c);
      $('#occBox').textContent = o.box;
      $('#occDesc').textContent = o.d;
      $('#occCta').textContent = 'شوف ' + o.box;
      $('#occCta').href = '#boxes';
      panel.classList.remove('swap');
    }, 150);
    $$('.box').forEach(b => b.style.outline = b.dataset.box === o.box ? '2px solid var(--tang)' : 'none');
  };
  tabs.addEventListener('click', e => e.target.dataset.i && show(+e.target.dataset.i));
  show(0);
})();

/* Personalization */
(() => {
  const pv = $('#preview'), card = $('#gcard'), msg = $('#msg'), out = $('#gmsg');
  const fallback = out.innerHTML;
  $$('input[name=rib]').forEach(r => r.addEventListener('change', () => pv.dataset.rib = r.value));
  $$('input[name=card]').forEach(r => r.addEventListener('change', () => card.classList.toggle('off', r.value === 'no')));
  msg.addEventListener('input', () => {
    out.textContent = '';
    if (!msg.value.trim()) { out.innerHTML = fallback; return; }
    msg.value.split('\n').forEach((line, i, a) => {
      out.append(document.createTextNode(line));
      if (i < a.length - 1) out.append(document.createElement('br'));
    });
  });
})();

/* Reveal on scroll */
(() => {
  const els = $$('.sec__head, .box, .steps li, blockquote, .quote, .big, .trust li');
  els.forEach(e => e.classList.add('rv'));
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .15 });
  els.forEach(e => io.observe(e));
})();
