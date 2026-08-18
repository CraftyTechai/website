document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('is-open'));
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('is-open'); });
    });
  }

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Footer year
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Mark active nav link
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a[href]').forEach(function (a) {
    var href = a.getAttribute('href').split('/').pop();
    if (href === here) a.classList.add('is-active');
  });
<<<<<<< HEAD
=======

  // Fetch and render students data on students.html
  if (document.getElementById('students-list')) {
    fetch('assets/js/students-data.json')
      .then(function (res) { return res.json(); })
      .then(function (students) {
        var container = document.getElementById('students-list');
        if (!students || !students.length) {
          container.innerHTML = '<p class="muted">No student data available.</p>';
          return;
        }
        var html = students.map(function (s) {
          return '\n            <article class="student-card reveal">\n              <div class="student-media">\n                <img src="' + (s.avatar || 'https://via.placeholder.com/96') + '" alt="' + s.name + ' avatar" width="96" height="96">\n              </div>\n              <div class="student-body">\n                <h3>' + s.name + '</h3>\n                <div class="muted">' + s.course + ' • ' + s.graduationYear + '</div>\n                <p>' + (s.bio || '') + '</p>\n              </div>\n            </article>';
        }).join('');
        container.innerHTML = '<div class="grid cols-3">' + html + '</div>';
        // trigger reveal for newly injected items
        var newReveals = container.querySelectorAll('.reveal');
        if (newReveals.length && 'IntersectionObserver' in window) {
          var io2 = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                io2.unobserve(entry.target);
              }
            });
          }, { threshold: 0.12 });
          newReveals.forEach(function (el) { io2.observe(el); });
        } else {
          newReveals.forEach(function (el) { el.classList.add('is-visible'); });
        }
      })
      .catch(function (err) {
        console.error('Failed to load students data', err);
      });
  }
>>>>>>> 9424ca8 (Add students data and portal sign-in improvements)
});
