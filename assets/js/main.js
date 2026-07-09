/* 昆明远驰商贸有限公司 · 官网交互脚本 */
(function () {
  'use strict';

  /* 头部滚动态 */
  var header = document.querySelector('.header');
  function onScroll() {
    if (window.scrollY > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 移动端导航 */
  var toggle = document.querySelector('.nav__toggle');
  var links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  /* 滚动揭示动画 */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* 联系表单（mailto 提交 + 本地反馈） */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name').value.trim();
      var phone = form.querySelector('#phone').value.trim();
      var email = form.querySelector('#email').value.trim();
      var topic = form.querySelector('#topic').value;
      var msg = form.querySelector('#message').value.trim();

      if (!name || !phone || !msg) {
        alert('请填写姓名、联系电话与需求内容，方便我们及时与您联系。');
        return;
      }

      var subject = '【官网咨询】' + (topic || '业务咨询') + ' - ' + name;
      var body = '尊敬的昆明远驰商贸有限公司：\n\n客户姓名：' + name +
                 '\n联系电话：' + phone +
                 '\n电子邮箱：' + (email || '（未填写）') +
                 '\n咨询方向：' + (topic || '未指定') +
                 '\n\n需求描述：\n' + msg +
                 '\n\n（本邮件由官网联系表单生成）';
      var mailto = 'mailto:wei2014wei@hotmail.com?subject=' +
                  encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

      var ok = document.getElementById('formOk');
      ok.classList.add('show');
      ok.textContent = '✓ 已为您生成邮件，正在打开邮件客户端…若未自动打开，请手动发送至 wei2014wei@hotmail.com';
      window.location.href = mailto;
      form.reset();
      ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(function () { ok.classList.remove('show'); }, 9000);
    });
  }

  /* ===== Lightbox（案例图片点击放大） ===== */
  var lbOverlay = document.getElementById('lbOverlay');
  var lbImg = document.getElementById('lbImg');
  var lbClose = document.getElementById('lbClose');
  if (lbOverlay && lbImg && lbClose) {
    document.querySelectorAll('.gal-item img').forEach(function (img) {
      img.addEventListener('click', function () {
        lbImg.src = this.src;
        lbImg.alt = this.alt || '';
        lbOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeLb() { lbOverlay.classList.remove('open'); document.body.style.overflow = ''; }
    lbClose.addEventListener('click', closeLb);
    lbOverlay.addEventListener('click', function (e) { if (e.target === lbOverlay) closeLb(); });
    document.addEventListener('keydown', function (e) { if ((e.key === 'Escape' || e.key === 'Esc') && lbOverlay.classList.contains('open')) closeLb(); });
  }

  /* 年份 */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
