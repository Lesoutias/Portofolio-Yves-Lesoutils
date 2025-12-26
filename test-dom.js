const fs = require('fs');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });

// Wait a moment for external scripts/styles to load
setTimeout(() => {
  const { document } = dom.window;
  const navElements = document.querySelectorAll('.nav-element');
  const hero = document.getElementById('hero');

  // Ensure hero starts active
  console.log('hero initially has active:', hero.classList.contains('active'));

  // Simulate clicking About nav item
  const aboutNav = Array.from(navElements).find(li => li.querySelector('a') && li.querySelector('a').getAttribute('href') === '#about');
  if (!aboutNav) {
    console.error('Could not find about nav');
    process.exit(2);
  }

  aboutNav.dispatchEvent(new dom.window.Event('click', { bubbles: true }));

  console.log('after click, hero active:', hero.classList.contains('active'));
  const aboutSection = document.getElementById('about');
  console.log('about active:', aboutSection.classList.contains('active'));

  process.exit(0);
}, 200);