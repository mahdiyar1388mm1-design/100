// Void // Studio — raw WebGL shader background with graceful 2D canvas fallback,
// live mouse coordinate readout, experiment grid, mobile nav, contact form.
(function () {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.getElementById('glCanvas');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let mouseX = 0.5, mouseY = 0.5;
  window.addEventListener('pointermove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = 1 - e.clientY / window.innerHeight;
    document.getElementById('coordDisplay').textContent =
      `x: ${String(Math.round(e.clientX)).padStart(4, '0')} · y: ${String(Math.round(e.clientY)).padStart(4, '0')}`;
  });

  let gl = null;
  try {
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  } catch (err) {
    gl = null;
  }

  if (gl && !reduceMotion) {
    // --- Raw WebGL shader background ---
    const vsSource = `
      attribute vec2 aPos;
      void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
    `;
    const fsSource = `
      precision mediump float;
      uniform vec2 uRes;
      uniform float uTime;
      uniform vec2 uMouse;
      void main() {
        vec2 uv = gl_FragCoord.xy / uRes.xy;
        vec2 p = (uv - 0.5) * vec2(uRes.x / uRes.y, 1.0);
        float d = length(p - (uMouse - 0.5) * vec2(uRes.x / uRes.y, 1.0));
        float wave = sin(d * 12.0 - uTime * 1.4) * 0.5 + 0.5;
        float glow = smoothstep(0.9, 0.0, d) * 0.6;
        vec3 colA = vec3(1.0, 0.18, 0.39);
        vec3 colB = vec3(0.03, 0.85, 0.84);
        vec3 col = mix(colA, colB, wave) * (0.12 + glow);
        col += vec3(0.02, 0.02, 0.03);
        gl_FragColor = vec4(col, 1.0);
      }
    `;
    function compile(type, src) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    }
    const vs = compile(gl.VERTEX_SHADER, vsSource);
    const fs = compile(gl.FRAGMENT_SHADER, fsSource);
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.useProgram(program);
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const aPos = gl.getAttribLocation(program, 'aPos');
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      const uRes = gl.getUniformLocation(program, 'uRes');
      const uTime = gl.getUniformLocation(program, 'uTime');
      const uMouse = gl.getUniformLocation(program, 'uMouse');

      function render(t) {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, t / 1000);
        gl.uniform2f(uMouse, mouseX, mouseY);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
    } else {
      gl = null; // linking failed — fall through to 2D fallback
    }
  }

  if (!gl) {
    // --- Graceful degradation: animated 2D canvas gradient ---
    const ctx = canvas.getContext('2d');
    function draw2D(t) {
      const grad = ctx.createRadialGradient(
        canvas.width * mouseX, canvas.height * (1 - mouseY), 20,
        canvas.width * mouseX, canvas.height * (1 - mouseY), Math.max(canvas.width, canvas.height) * 0.6
      );
      const hue = (t / 30) % 360;
      grad.addColorStop(0, `hsla(${hue}, 80%, 50%, 0.25)`);
      grad.addColorStop(1, 'rgba(2,2,3,1)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (!reduceMotion) requestAnimationFrame(draw2D);
    }
    requestAnimationFrame(draw2D);
    if (reduceMotion) { ctx.fillStyle = '#020203'; ctx.fillRect(0, 0, canvas.width, canvas.height); }
  }

  // Experiment grid
  const experiments = [
    { title: 'Fragment Field No.12', seed: 'void-e1' },
    { title: 'Type Distortion Study', seed: 'void-e2' },
    { title: 'Particle Choir', seed: 'void-e3' },
    { title: 'Refraction Study 04', seed: 'void-e4' },
    { title: 'Signal Noise', seed: 'void-e5' },
    { title: 'Depth Grid Experiment', seed: 'void-e6' },
  ];
  document.getElementById('expGrid').innerHTML = experiments.map((e) => `
    <div class="exp-card">
      <img src="https://picsum.photos/seed/${e.seed}/400/500" alt="${e.title} — generative visual experiment" loading="lazy">
      <div class="exp-cap">${e.title}</div>
    </div>`).join('');

  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('contactNote').textContent = 'Transmission received — we reply to every signal within 48 hours.';
    form.reset();
  });
})();
