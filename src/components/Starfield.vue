<template>
	<canvas ref="canvas" class="starfield" aria-hidden="true"></canvas>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

// Logbook-style backdrop: black space with small, slowly drifting stars of mixed colors.
type Star = {
	x: number;
	y: number;
	r: number;
	vx: number;
	vy: number;
	color: string;
	alpha: number;
	twinkleSpeed: number;
	twinklePhase: number;
};

// Mostly white/blue-white, with occasional warm, violet and cyan stars.
const PALETTE = [
	'#ffffff',
	'#ffffff',
	'#ffffff',
	'#dce9ff',
	'#dce9ff',
	'#a9cdff',
	'#a9cdff',
	'#ffe3a3',
	'#ffb27d',
	'#ff8a7a',
	'#c9a8ff',
	'#8eeeff',
];
const PIXELS_PER_STAR = 5200;
const MAX_STARS = 420;
const MAX_CANVAS_PIXELS = 6_000_000;
const FRAME_INTERVAL = 1000 / 30; // a gentle drift doesn't need more than 30 fps

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let stars: Star[] = [];
let width = 0;
let height = 0;
let frame = 0;
let lastTime = 0;
let lastDraw = 0;
let reducedMotion: MediaQueryList | null = null;

const random = (min: number, max: number) => min + Math.random() * (max - min);

const makeStar = (): Star => {
	// Depth: most stars are tiny and slow, a few are larger, brighter and a little faster.
	const depth = Math.random() ** 2.2;
	const speed = random(2, 6) + depth * 14; // px per second
	const angle = random(0, Math.PI * 2);
	return {
		x: random(0, width),
		y: random(0, height),
		r: 0.45 + depth * 1.35,
		vx: Math.cos(angle) * speed,
		vy: Math.sin(angle) * speed,
		color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
		alpha: random(0.35, 0.75) + depth * 0.25,
		twinkleSpeed: random(0.4, 1.6),
		twinklePhase: random(0, Math.PI * 2),
	};
};

const resize = () => {
	const el = canvas.value;
	if (!el || !ctx) return;
	width = window.innerWidth;
	height = window.innerHeight;
	const dpr = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(MAX_CANVAS_PIXELS / Math.max(1, width * height)));
	el.width = Math.round(width * dpr);
	el.height = Math.round(height * dpr);
	ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	const target = Math.min(MAX_STARS, Math.round((width * height) / PIXELS_PER_STAR));
	if (stars.length > target) stars.length = target;
	while (stars.length < target) stars.push(makeStar());
	for (const star of stars) {
		star.x %= width;
		star.y %= height;
	}
	draw(performance.now());
};

const draw = (time: number) => {
	if (!ctx) return;
	ctx.clearRect(0, 0, width, height);
	const seconds = time / 1000;
	for (const star of stars) {
		const twinkle = reducedMotion?.matches
			? 1
			: 0.7 + 0.3 * Math.sin(seconds * star.twinkleSpeed + star.twinklePhase);
		ctx.globalAlpha = Math.min(1, star.alpha * twinkle);
		ctx.fillStyle = star.color;
		ctx.beginPath();
		ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
		ctx.fill();
		// A soft radial glow on the brightest stars (fades out, so it never reads as a dot).
		if (star.r > 1.2) {
			const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, 4);
			glow.addColorStop(0, star.color);
			glow.addColorStop(1, 'transparent');
			ctx.globalAlpha *= 0.12;
			ctx.fillStyle = glow;
			ctx.beginPath();
			ctx.arc(star.x, star.y, 4, 0, Math.PI * 2);
			ctx.fill();
		}
	}
	ctx.globalAlpha = 1;
};

const step = (time: number) => {
	frame = requestAnimationFrame(step);
	if (time - lastDraw < FRAME_INTERVAL) return;
	lastDraw = time;
	const dt = Math.min((time - lastTime) / 1000, 0.1);
	lastTime = time;
	for (const star of stars) {
		star.x += star.vx * dt;
		star.y += star.vy * dt;
		// Wrap around the edges with a small margin so stars don't pop in.
		if (star.x < -4) star.x += width + 8;
		else if (star.x > width + 4) star.x -= width + 8;
		if (star.y < -4) star.y += height + 8;
		else if (star.y > height + 4) star.y -= height + 8;
	}
	draw(time);
};

const start = () => {
	if (frame || reducedMotion?.matches || document.hidden) return;
	lastTime = performance.now();
	frame = requestAnimationFrame(step);
};
const stop = () => {
	cancelAnimationFrame(frame);
	frame = 0;
};
const onVisibility = () => (document.hidden ? stop() : start());
const onMotionChange = () => {
	stop();
	draw(performance.now());
	start();
};

onMounted(() => {
	// jsdom (tests) has no 2D canvas; skip quietly there.
	const userAgent = navigator.userAgent ?? '';
	if (!canvas.value || !userAgent || userAgent.includes('jsdom')) return;
	ctx = canvas.value.getContext('2d');
	if (!ctx) return;
	reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)') ?? null;
	resize();
	start();
	window.addEventListener('resize', resize);
	document.addEventListener('visibilitychange', onVisibility);
	reducedMotion?.addEventListener?.('change', onMotionChange);
});

onBeforeUnmount(() => {
	stop();
	window.removeEventListener('resize', resize);
	document.removeEventListener('visibilitychange', onVisibility);
	reducedMotion?.removeEventListener?.('change', onMotionChange);
});
</script>
