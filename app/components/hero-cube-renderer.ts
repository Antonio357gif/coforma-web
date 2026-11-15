type Vector = number[];
type Point = number[];
type Tile = [column: number, row: number, kind: 'logo' | 'wordmark'];
type Face = {
  normal: Vector;
  across: Vector;
  down: Vector;
  hue: number;
  outside: boolean;
  tile: Tile | null;
};
type Piece = { position: Vector; faces: Face[] };
type Move = { axis: number; layer: number; direction: number };

export function startHeroCube(
  canvas: HTMLCanvasElement,
  onReady: () => void,
  onPaused: (paused: boolean) => void,
) {
  const context = canvas.getContext('2d');
  if (!context) return;
  const ctx = context;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const logo = new Image();
  const wordmark = new Image();
  const wordmarkTexture = document.createElement('canvas');
  wordmarkTexture.width = 256;
  wordmarkTexture.height = 256;
  const wordmarkCanvasContext = wordmarkTexture.getContext('2d');
  if (!wordmarkCanvasContext) return;
  const wordmarkContext = wordmarkCanvasContext;
  let loaded = false;
  let inView = true;
  let disposed = false;

  const spacing = 2 / 3;
  const half = spacing / 2 - .024;
  const camera = 6.4;
  const faces = [
    { normal: [0, 0, 1], across: [1, 0, 0], down: [0, 1, 0], hue: 157 },
    { normal: [1, 0, 0], across: [0, 0, -1], down: [0, 1, 0], hue: 192 },
    { normal: [0, 0, -1], across: [-1, 0, 0], down: [0, 1, 0], hue: 172 },
    { normal: [-1, 0, 0], across: [0, 0, 1], down: [0, 1, 0], hue: 212 },
    { normal: [0, -1, 0], across: [1, 0, 0], down: [0, 0, 1], hue: 146 },
    { normal: [0, 1, 0], across: [1, 0, 0], down: [0, 0, -1], hue: 185 },
  ];
  const dot = (a: Vector, b: Vector) => a.reduce((sum, value, k) => sum + value * b[k], 0);
  const ease = (n: number) => n * n * (3 - 2 * n);
  const clamp = (n: number) => Math.max(0, Math.min(1, n));

  function rotate(vector: Vector, axis: number, sine: number, cosine: number) {
    const result = vector.slice();
    const first = (axis + 1) % 3;
    const second = (axis + 2) % 3;
    result[first] = vector[first] * cosine - vector[second] * sine;
    result[second] = vector[first] * sine + vector[second] * cosine;
    return result;
  }

  const solved: Piece[] = [];
  for (const x of [-1, 0, 1]) {
    for (const y of [-1, 0, 1]) {
      for (const z of [-1, 0, 1]) {
        const position = [x, y, z];
        solved.push({
          position,
          faces: faces.map((face, index): Face => ({
            ...face,
            outside: dot(position, face.normal) === 1,
            tile: index === 0 && z === 1 ? [x + 1, y + 1, 'logo']
              : index === 1 && x === 1 ? [1 - z, y + 1, 'wordmark']
              : null,
          })),
        });
      }
    }
  }

  function turn(cube: Piece[], { axis, layer, direction }: Move, progress: number, snap = false) {
    const angle = direction * Math.PI / 2 * progress;
    const sine = snap ? direction : Math.sin(angle);
    const cosine = snap ? 0 : Math.cos(angle);
    const transform = (point: Vector) => rotate(point, axis, sine, cosine);
    return cube.map((piece) => {
      if (piece.position[axis] !== layer) return piece;
      return {
        position: transform(piece.position),
        faces: piece.faces.map((face) => ({
          ...face,
          normal: transform(face.normal),
          across: transform(face.across),
          down: transform(face.down),
        })),
      };
    });
  }

  const scramble = [[1, -1], [0, 1], [1, 1], [2, 1], [0, -1], [1, -1]].map(
    ([axis, layer]) => ({ axis, layer, direction: Math.random() < .5 ? -1 : 1 })
  );
  const moves = scramble.slice().reverse().map((move) => ({ ...move, direction: -move.direction }));
  const mixedStates = [solved];
  for (const move of scramble) mixedStates.push(turn(mixedStates[mixedStates.length - 1], move, 1, true));
  const states = mixedStates.slice().reverse();

  const lead = 1.25;
  const beat = .78;
  const finish = lead + beat * moves.length;
  const reveal = finish + .9;
  const showWordmark = reveal + 1.6;
  const wordmarkHold = showWordmark + 1.45;
  const mixAgain = wordmarkHold + 2;
  const mixBeat = .52;
  const cycle = mixAgain + mixBeat * scramble.length;
  let width = 0, height = 0;
  let time = motion.matches ? reveal : 0;
  let paused = motion.matches;
  let lastTick: number | undefined;
  let animationId = 0;

  function polygon(points: Point[]) {
    ctx.beginPath();
    for (const [index, [x, y]] of points.entries()) {
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  function imageTriangle(image: CanvasImageSource, source: Point[], dest: Point[]) {
    const [[u0, v0], [u1, v1], [u2, v2]] = source;
    const [[x0, y0], [x1, y1], [x2, y2]] = dest;
    const du1 = u1 - u0, dv1 = v1 - v0, du2 = u2 - u0, dv2 = v2 - v0;
    const inv = 1 / (du1 * dv2 - du2 * dv1);
    const a = ((x1 - x0) * dv2 - (x2 - x0) * dv1) * inv;
    const b = ((y1 - y0) * dv2 - (y2 - y0) * dv1) * inv;
    const c = ((x2 - x0) * du1 - (x1 - x0) * du2) * inv;
    const d = ((y2 - y0) * du1 - (y1 - y0) * du2) * inv;
    ctx.save();
    const middleX = (x0 + x1 + x2) / 3;
    const middleY = (y0 + y1 + y2) / 3;
    polygon(dest.map(([x, y]) => [
      x + (x - middleX) * .035,
      y + (y - middleY) * .035,
    ]));
    ctx.clip();
    ctx.transform(a, b, c, d, x0 - a * u0 - c * v0, y0 - b * u0 - d * v0);
    ctx.drawImage(image, 0, 0);
    ctx.restore();
  }

  function texture(image: HTMLImageElement | HTMLCanvasElement, tile: Tile, projectFace: (u: number, v: number) => Point) {
    const divisions = 2;
    const step = half * 2 / divisions;
    const extent = image.width / 2;
    const texturePoint = (u: number, v: number) => [
      (1 + (tile[0] - 1) * spacing + u) * extent,
      (1 + (tile[1] - 1) * spacing + v) * extent,
    ];
    for (let row = 0; row < divisions; row += 1) {
      for (let col = 0; col < divisions; col += 1) {
        const x = -half + step * col;
        const y = -half + step * row;
        const points = [[x, y], [x + step, y], [x + step, y + step], [x, y + step]];
        const source = points.map(([u, v]) => texturePoint(u, v));
        const destination = points.map(([u, v]) => projectFace(u, v));
        imageTriangle(image, [source[0], source[1], source[2]], [destination[0], destination[1], destination[2]]);
        imageTriangle(image, [source[0], source[2], source[3]], [destination[0], destination[2], destination[3]]);
      }
    }
  }

  function stage(at: number, start: number, duration: number, sequence: Move[], snapshots: Piece[][]) {
    const advance = Math.max(0, (at - start) / duration);
    const index = Math.min(Math.floor(advance), sequence.length);
    return index === sequence.length
      ? snapshots[index]
      : turn(snapshots[index], sequence[index], ease(clamp((advance - index) / .88)));
  }

  function approach(from: Vector, to: Vector, progress: number) {
    const weight = ease(clamp(progress));
    return from.map((angle, index) => angle + (to[index] - angle) * weight);
  }

  function draw() {
    if (!loaded || !width || !height) return;
    const at = time % cycle;
    const cube = at < mixAgain
      ? stage(at, lead, beat, moves, states)
      : stage(at, mixAgain, mixBeat, scramble, mixedStates);
    const initial = [-.36, -.56, -.09];
    const logoView = [-.23, -.25, 0];
    const brandView = [-.21, -1.34, .02];
    const drift = Math.min(at, finish);
    const moving = [
      initial[0] + .28 * Math.sin(drift * .98),
      initial[1] + .39 * Math.sin(drift * .78),
      initial[2] + .22 * Math.sin(drift * .89),
    ];
    let pose = approach(moving, logoView, (at - finish) / (reveal - finish));
    if (at >= showWordmark) {
      pose = approach(logoView, brandView, (at - showWordmark) / (wordmarkHold - showWordmark));
    }
    if (at >= mixAgain) {
      const progress = (at - mixAgain) / (cycle - mixAgain);
      pose = approach(brandView, initial, progress);
      const tilt = Math.sin(Math.PI * progress) ** 2;
      pose[0] -= .28 * tilt;
      pose[2] += .24 * tilt;
    }
    const angles = pose.map((angle) => [Math.sin(angle), Math.cos(angle)] as const);
    const orient = (point: Vector) => {
      const rotateAbout = (vector: Vector, axis: number) => rotate(vector, axis, ...angles[axis]);
      return rotateAbout(rotateAbout(rotateAbout(point, 1), 0), 2);
    };
    const centerX = width * .5;
    const centerY = height * .44;
    const scale = Math.min(width, height) * .25;
    const project = ([x, y, z]: Vector) => {
      const factor = scale * camera / (camera - z);
      return [centerX + x * factor, centerY + y * factor];
    };
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) * .65);
    gradient.addColorStop(0, '#183632');
    gradient.addColorStop(.52, '#090f12');
    gradient.addColorStop(1, '#030507');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    const visible = [];
    for (const piece of cube) {
      const center = orient(piece.position.map((value) => value * spacing));
      for (const face of piece.faces) {
        const normal = orient(face.normal);
        const surface = center.map((value, k) => value + normal[k] * half);
        if (normal[2] * camera <= dot(normal, surface)) continue;
        visible.push({ face, normal, surface, across: orient(face.across), down: orient(face.down) });
      }
    }
    visible.sort((a, b) => a.surface[2] - b.surface[2]);

    const corner = .04;
    const outline = [
      [-half + corner, -half], [half - corner, -half], [half, -half + corner],
      [half, half - corner], [half - corner, half], [-half + corner, half],
      [-half, half - corner], [-half, -half + corner],
    ];
    for (const { face, normal, surface, across, down } of visible) {
      const projectFace = (u: number, v: number) => project(surface.map((coordinate, k) => coordinate + across[k] * u + down[k] * v));
      const points = outline.map(([u, v]) => projectFace(u, v));
      const light = Math.max(0, dot(normal, [-.35, -.78, .48]));
      const shade = 19 + 42 * light;
      const [x0, y0] = points[0];
      const [x1, y1] = points[4];
      const finish = ctx.createLinearGradient(x0, y0, x1, y1);
      finish.addColorStop(0, 'hsl(' + face.hue + ' 46% ' + (shade + 15) + '%)');
      finish.addColorStop(.56, 'hsl(' + face.hue + ' 42% ' + shade + '%)');
      finish.addColorStop(1, 'hsl(' + (face.hue + 9) + ' 47% ' + (shade - 10) + '%)');
      polygon(points);
      ctx.fillStyle = face.outside ? finish : '#111a1c';
      ctx.fill();
      if (face.tile) {
        const image = face.tile[2] === 'logo' ? logo : wordmarkTexture;
        ctx.save();
        ctx.clip();
        texture(image, face.tile, projectFace);
        ctx.restore();
      }
      polygon(points);
      ctx.strokeStyle = face.outside ? '#b2d4cd75' : '#1f2b2c';
      ctx.lineWidth = .68;
      ctx.stroke();
    }
  }

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw();
  }

  function frame(tick: number) {
    if (lastTick !== undefined) time = (time + Math.min(tick - lastTick, 60) / 1000) % cycle;
    lastTick = tick;
    draw();
    animationId = requestAnimationFrame(frame);
  }

  function setPaused(value: boolean) {
    paused = value;
    onPaused(paused);
    resumeIfVisible();
  }

  function resumeIfVisible() {
    cancelAnimationFrame(animationId);
    lastTick = undefined;
    if (loaded && !disposed && !paused && inView && !document.hidden) {
      animationId = requestAnimationFrame(frame);
    }
  }

  function updateMotion(event: MediaQueryListEvent) {
    if (event.matches) time = reveal;
    draw();
    setPaused(event.matches);
  }

  function loadTextures() {
    if (disposed || loaded || !logo.naturalWidth || !wordmark.naturalWidth || !logo.complete || !wordmark.complete) return;
    wordmarkContext.fillStyle = '#020618';
    wordmarkContext.fillRect(0, 0, 256, 256);
    wordmarkContext.drawImage(wordmark, 0, 17, 194, 46, 9, 100, 238, 56);
    loaded = true;
    resize();
    onReady();
    resumeIfVisible();
  }

  const resizeObserver = new ResizeObserver(resize);
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    resumeIfVisible();
  });
  resizeObserver.observe(canvas);
  intersectionObserver.observe(canvas);
  document.addEventListener('visibilitychange', resumeIfVisible);
  motion.addEventListener('change', updateMotion);
  logo.addEventListener('load', loadTextures);
  wordmark.addEventListener('load', loadTextures);
  logo.src = '/hero/cubo-isotipo.png';
  wordmark.src = '/hero/cubo-coforma.png';
  onPaused(paused);

  return {
    togglePause() {
      setPaused(!paused);
    },
    replay() {
      time = 0;
      draw();
      setPaused(false);
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', resumeIfVisible);
      motion.removeEventListener('change', updateMotion);
      logo.removeEventListener('load', loadTextures);
      wordmark.removeEventListener('load', loadTextures);
    },
  };
}
