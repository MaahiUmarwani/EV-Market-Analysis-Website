/* ---------- Mobile menu ---------- */
var menuBtn = document.querySelector('.menu-btn');
if (menuBtn) {
  menuBtn.addEventListener('click', function () {
    document.querySelector('.links').classList.toggle('open');
  });
}
document.querySelectorAll('.links a').forEach(function (a) {
  a.addEventListener('click', function () { document.querySelector('.links').classList.remove('open'); });
});

/* ---------- Tableau embeds (Dashboard + Story pages) ---------- */
var VIZ = [['vizDashboard', 'fbDashboard'], ['vizStory', 'fbStory']].filter(function (p) {
  return document.getElementById(p[0]);
});
function sizeViz(id) {
  var div = document.getElementById(id); if (!div) return;
  var obj = div.getElementsByTagName('object')[0]; if (!obj) return;
  var w = div.offsetWidth;
  obj.style.width = '100%';
  obj.style.height = (w > 500 ? Math.round(w * 0.72) : 1900) + 'px';
}
function showFallbacks() {
  VIZ.forEach(function (p) {
    document.getElementById(p[0]).style.display = 'none';
    document.getElementById(p[1]).style.display = 'block';
  });
}
if (VIZ.length) {
  VIZ.forEach(function (p) { sizeViz(p[0]); });
  var s = document.createElement('script');
  s.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
  s.onerror = showFallbacks;
  document.body.appendChild(s);
  // If the viz has not produced an iframe after 12s (e.g. blocked), show a link card instead
  setTimeout(function () {
    VIZ.forEach(function (p) {
      var d = document.getElementById(p[0]);
      if (d && !d.querySelector('iframe')) { d.style.display = 'none'; document.getElementById(p[1]).style.display = 'block'; }
    });
  }, 12000);
}

/* ---------- Counters + reveal ---------- */
function animateCount(el) {
  var target = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec || 0),
      pre = el.dataset.prefix || '', suf = el.dataset.suffix || '', start = null, dur = 1600;
  function step(t) {
    if (!start) start = t;
    var p = Math.min((t - start) / dur, 1), v = target * (1 - Math.pow(1 - p, 3));
    el.textContent = pre + v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
function fillBars(scope) {
  scope.querySelectorAll('.bar-list').forEach(function (list) {
    var max = parseFloat(list.dataset.max);
    list.querySelectorAll('.fill').forEach(function (f) { f.style.width = (parseFloat(f.dataset.v) / max * 100) + '%'; });
  });
}
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      var c = e.target.querySelector('[data-count]'); if (c && !c.done) { c.done = 1; animateCount(c); }
      if (e.target.querySelector('.bar-list')) fillBars(e.target.querySelector('.panel.on') || e.target);
      io.unobserve(e.target);
    }
  });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

/* ---------- Insight tabs (Home page) ---------- */
document.querySelectorAll('#tabs button').forEach(function (b) {
  b.addEventListener('click', function () {
    document.querySelectorAll('#tabs button').forEach(function (x) { x.classList.remove('on'); });
    document.querySelectorAll('.panel').forEach(function (x) { x.classList.remove('on'); });
    b.classList.add('on');
    var p = document.getElementById(b.dataset.p); p.classList.add('on');
    p.querySelectorAll('.fill').forEach(function (f) { f.style.width = '0'; });
    setTimeout(function () { fillBars(p); }, 40);
  });
});

/* ---------- Charts (Home page) ---------- */
if (window.Chart && document.getElementById('batteryChart')) {
  Chart.defaults.font.family = 'Inter, sans-serif';
  Chart.defaults.color = '#5b6b80';
  var batt = {
    labels: ['NMC', 'LFP', 'NCA', 'Sodium-Ion', 'Solid-State'],
    data: [33.80, 31.99, 17.23, 9.88, 7.10],
    colors: ['#e8564f', '#4e79a7', '#f28e2b', '#76b7b2', '#59a14f'],
    info: [
      '<b>NMC (33.8%)</b>: the largest share. Nickel-Manganese-Cobalt offers high energy density and is common in long-range cars.',
      '<b>LFP (32.0%)</b>: close second. Lithium Iron Phosphate is cheaper, safer and longer-lasting, which makes it popular for affordable EVs.',
      '<b>NCA (17.2%)</b>: Nickel-Cobalt-Aluminium has high performance and energy density, often in premium models.',
      '<b>Sodium-Ion (9.9%)</b>: an emerging, lower-cost chemistry that doesn\'t rely on lithium.',
      '<b>Solid-State (≈7.1%)</b>: next-generation technology promising faster charging and better safety.'
    ]
  };
  new Chart(document.getElementById('batteryChart'), {
    type: 'doughnut',
    data: { labels: batt.labels, datasets: [{ data: batt.data, backgroundColor: batt.colors, borderWidth: 3, borderColor: '#fff', hoverOffset: 14 }] },
    options: {
      maintainAspectRatio: false, cutout: '55%',
      plugins: {
        legend: { position: 'right', labels: { usePointStyle: true, padding: 16 } },
        tooltip: { callbacks: { label: function (c) { return ' ' + c.label + ': ' + c.parsed.toFixed(2) + '%'; } } }
      },
      onClick: function (e, els) { if (els.length) { document.getElementById('batteryDetail').innerHTML = batt.info[els[0].index]; } }
    }
  });
  new Chart(document.getElementById('regionChart'), {
    type: 'bar',
    data: {
      labels: ['South Asia', 'North America', 'Latin America', 'Asia Pacific', 'Middle East', 'Africa', 'Europe'],
      datasets: [{
        data: [14.4, 14.4, 14.4, 14.3, 14.3, 14.2, 14.0],
        backgroundColor: ['#2c5985', '#2f6f99', '#3a87a8', '#4ea3b8', '#6ab7c4', '#93cdd1', '#bde3dc'], borderRadius: 8
      }]
    },
    options: {
      indexAxis: 'y', maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: function (c) { return ' ' + c.parsed.x + '% of sales'; } } } },
      scales: { x: { min: 13, max: 15, ticks: { callback: function (v) { return v + '%'; } }, grid: { color: '#eef2f6' } }, y: { grid: { display: false } } }
    }
  });
}