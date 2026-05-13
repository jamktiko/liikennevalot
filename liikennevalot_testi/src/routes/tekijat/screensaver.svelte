<script lang="ts">
	// 🎯 YOU CONTROL THE BOUNCE AREA HERE (in pixels)
	let areaWidth = 1280;
	let areaHeight = 720;

	let x = $state(50);
	let y = $state(50);

	let vx = $state(3);
	let vy = $state(2);

	let color = $state('red');
	let trail = $state<{ x: number; y: number; color: string }[]>([]);

	let running = false;
	let raf: number;

	const boxSize = 80;

	function randomColor() {
		return `hsl(${Math.random() * 360}, 80%, 60%)`;
	}

	function randomSpeedBoost() {
		vx += (Math.random() - 0.5) * 2;
		vy += (Math.random() - 0.5) * 2;

		vx = Math.max(-8, Math.min(8, vx));
		vy = Math.max(-8, Math.min(8, vy));
	}

	function step() {
		x += vx;
		y += vy;

		let bounced = false;

		// LEFT / RIGHT (virtual area)
		if (x <= 0) {
			x = 0;
			vx *= -1;
			bounced = true;
		} else if (x + boxSize >= areaWidth) {
			x = areaWidth - boxSize;
			vx *= -1;
			bounced = true;
		}

		// TOP / BOTTOM (virtual area)
		if (y <= 0) {
			y = 0;
			vy *= -1;
			bounced = true;
		} else if (y + boxSize >= areaHeight) {
			y = areaHeight - boxSize;
			vy *= -1;
			bounced = true;
		}

		if (bounced) {
			color = randomColor();
			randomSpeedBoost();

			trail = [...trail.slice(-20), { x, y, color }];
		}

		raf = requestAnimationFrame(step);
	}

	export function startSaver() {
		if (running) return;
		running = true;
		raf = requestAnimationFrame(step);
	}

	export function stopSaver() {
		running = false;
		cancelAnimationFrame(raf);
	}
</script>

<div class="container" style="width:{areaWidth}px; height:{areaHeight}px;">
	{#each trail as t (t)}
		<div class="trail" style="transform: translate({t.x}px, {t.y}px); background: {t.color};"></div>
	{/each}

	<div class="box" style="transform: translate({x}px, {y}px); background: {color};"></div>
</div>

<style>
	.container {
		position: absolute;
		overflow: hidden;
	}

	.box {
		width: 80px;
		height: 80px;
		position: absolute;
		will-change: transform;
		border-radius: 50%;
	}

	.trail {
		width: 80px;
		height: 80px;
		position: absolute;
		opacity: 0.15;
		pointer-events: none;
		border-radius: 50%;
	}
</style>
