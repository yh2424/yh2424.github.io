// ASDL site behaviour: mobile nav, home hero rotation, team cards, page table of contents.
(function () {
  "use strict";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mobile navigation toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    document.documentElement.classList.add("nav-ready");
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // One switch pauses every animation on the page (hero photos and the SING light pulses)
  var userPaused = false;
  var motionButtons = document.querySelectorAll(".motion-toggle");
  if (reduceMotion) motionButtons.forEach(function (b) { b.hidden = true; });
  var onMotionChange = [];
  var setPaused = function (p) {
    userPaused = p;
    document.documentElement.classList.toggle("motion-paused", p);
    motionButtons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(p));
      b.textContent = p ? (b.getAttribute("data-play") || "Play animation") : (b.getAttribute("data-pause") || "Pause animation");
    });
    onMotionChange.forEach(function (f) { f(p); });
  };
  motionButtons.forEach(function (b) { b.addEventListener("click", function () { setPaused(!userPaused); }); });

  // Home hero: cross-fade through the cover photos listed in index.html
  var hero = document.querySelector(".home-hero");
  if (hero) {
    var slides = hero.querySelectorAll(".slides li");
    var dots = hero.querySelectorAll(".dots button");
    var cap = hero.querySelector(".cap");
    var cur = 0, timer = null;
    var load = function (i) {
      var img = slides[i] && slides[i].querySelector("img[data-src]");
      if (img) { img.src = img.getAttribute("data-src"); img.removeAttribute("data-src"); }
    };
    var show = function (i) {
      slides[cur].classList.remove("on");
      if (dots[cur]) dots[cur].removeAttribute("aria-current");
      cur = (i + slides.length) % slides.length;
      load(cur);
      slides[cur].classList.add("on");
      if (dots[cur]) dots[cur].setAttribute("aria-current", "true");
      if (cap) cap.textContent = slides[cur].getAttribute("data-cap") || "";
      load(cur + 1);
    };
    var start = function () {
      if (reduceMotion || userPaused || slides.length < 2) return;
      stop();
      timer = setInterval(function () { show(cur + 1); }, 6500);
    };
    var stop = function () { if (timer) { clearInterval(timer); timer = null; } };
    dots.forEach(function (d, i) { d.addEventListener("click", function () { show(i); start(); }); });
    hero.addEventListener("mouseenter", stop);
    hero.addEventListener("mouseleave", start);
    document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });
    onMotionChange.push(function (p) { p ? stop() : start(); });
    load(1);
    start();
  }

  // PAM-4 eye: the live sweep draws a new random symbol sequence on every pass
  var eyeLive = document.querySelector("[data-eye-live]");
  if (eyeLive) {
    var LEVELS = [84, 60, 36, 12.5];
    var jit = function (a) { return (Math.random() - 0.5) * 2 * a; };
    var reshape = function () {
      var d = "", x = -25, prev;
      for (var k = 0; k < 4; k++) {
        var y = (LEVELS[Math.floor(Math.random() * 4)] + jit(1.8)).toFixed(1);
        if (k === 0) d = "M" + x + " " + y;
        else d += "C" + (x - 110 + 57 + jit(2)).toFixed(1) + " " + prev + " " + (x - 57 + jit(2)).toFixed(1) + " " + y + " " + x + " " + y;
        prev = y;
        x += 110;
      }
      eyeLive.setAttribute("d", d);
    };
    reshape();
    eyeLive.addEventListener("animationiteration", reshape);
  }

  // Team page: turn the markdown (# section, ### name, #### details, ---) into member cards
  var team = document.querySelector(".prose.team");
  if (team) {
    var nodes = Array.prototype.slice.call(team.childNodes);
    var grid = null, card = null, isPI = false;
    var frag = document.createDocumentFragment();
    nodes.forEach(function (n) {
      if (n.nodeType !== 1) { if (n.nodeType === 3 && !n.textContent.trim()) return; frag.appendChild(n); return; }
      var tag = n.tagName;
      if (tag === "H1" || tag === "H2") {
        grid = null; card = null;
        isPI = /principal/i.test(n.textContent);
        frag.appendChild(n);
      } else if (tag === "H3") {
        if (!grid) {
          grid = document.createElement("div");
          grid.className = "member-grid" + (isPI ? " pi-grid" : "");
          frag.appendChild(grid);
        }
        card = document.createElement("div");
        card.className = "member" + (isPI ? " pi" : "");
        var ini = document.createElement("span");
        ini.className = "ini";
        ini.setAttribute("aria-hidden", "true");
        // "김 영현, Younghyun Kim, Ph.D." -> "YK" (given-name + surname initials)
        var parts = n.textContent.split(",");
        var en = (parts.length > 1 ? parts[1] : parts[0]).trim().split(/\s+/);
        ini.textContent = (en[0].charAt(0) + (en.length > 1 ? en[en.length - 1].charAt(0) : "")).toUpperCase();
        card.appendChild(ini);
        var body = document.createElement("div");
        body.className = "body";
        body.appendChild(n);
        card.appendChild(body);
        grid.appendChild(card);
      } else if (card && /^(H4|H5|P|UL|OL|BLOCKQUOTE|FIGURE|TABLE)$/.test(tag)) {
        card.lastChild.appendChild(n);
      } else if (tag === "HR") {
        n.parentNode.removeChild(n);
        card = null;
      } else {
        card = null; grid = null;
        frag.appendChild(n);
      }
    });
    team.appendChild(frag);
  }

  // Table of contents for long pages (publication): built from headings
  var toc = document.querySelector(".toc[data-for]");
  if (toc) {
    var src = document.querySelector(toc.getAttribute("data-for"));
    if (src) {
      src.querySelectorAll("h1[id], h2[id], h3[id]").forEach(function (h) {
        var a = document.createElement("a");
        a.href = "#" + h.id;
        a.textContent = h.textContent.trim();
        if (h.tagName === "H3") a.className = "lvl2";
        toc.appendChild(a);
      });
    }
  }
})();
