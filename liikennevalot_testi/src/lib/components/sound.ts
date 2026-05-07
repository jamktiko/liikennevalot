const pools: Record<string, HTMLAudioElement[]> = {};

const POOL_SIZE = 5;

// 🔊 globaalit asetukset
let globalVolume = 1; // 0–1
let muted = false;
let backgroundMusic: HTMLAudioElement | null = null;

// ------------------
// REGISTER
// ------------------
export function registerSound(name: string, src: string) {
	if (pools[name]) return;

	pools[name] = Array.from({ length: POOL_SIZE }, () => {
		const audio = new Audio(src);
		audio.preload = 'auto';
		audio.volume = globalVolume;
		return audio;
	});
}
export function registerMusic(src: string) {
	if (backgroundMusic) return;

	backgroundMusic = new Audio(src);
	backgroundMusic.loop = true;
	backgroundMusic.preload = 'auto';
	backgroundMusic.volume = globalVolume;
}

// ------------------
// PLAY
// ------------------
export function playSound(name: string) {
	if (muted) return;

	const pool = pools[name];
	if (!pool) return;

	const audio = pool.find((a) => a.paused || a.ended) ?? pool[0];

	audio.currentTime = 0;
	audio.volume = globalVolume;

	audio.play().catch(() => {});
}
export async function playMusic() {
	if (!backgroundMusic || muted) return;

	try {
		await backgroundMusic.play();
	} catch (err) {
		console.log('Music autoplay blocked');
	}
}

// ------------------
// STOP
// ------------------
export function stopSound(name: string) {
	const pool = pools[name];
	if (!pool) return;

	pool.forEach((audio) => {
		audio.pause();
		audio.currentTime = 0;
	});
}
export function stopMusic() {
	if (!backgroundMusic) return;

	backgroundMusic.pause();
	backgroundMusic.currentTime = 0;
}
export function pauseMusic() {
	if (!backgroundMusic) return;

	backgroundMusic.pause();
}

// ------------------
// VOLUME
// ------------------
export function setVolume(value: number) {
	globalVolume = Math.max(0, Math.min(1, value));

	// päivitä kaikki jo ladatut audion instanssit
	Object.values(pools).forEach((pool) => {
		pool.forEach((audio) => {
			audio.volume = globalVolume;
		});
	});
}

export function getVolume() {
	return globalVolume;
}

// ------------------
// MUTE
// ------------------
export function toggleMute() {
	muted = !muted;
}

export function setMute(value: boolean) {
	muted = value;
}

export function isMuted() {
	return muted;
}

// ------------------
// WARMUP
// ------------------
export function warmSound(name: string) {
	const pool = pools[name];
	if (!pool) return;

	pool.forEach((audio) => {
		audio.volume = 0;
		audio.play().then(() => {
			audio.pause();
			audio.currentTime = 0;
			audio.volume = globalVolume;
		});
	});
}
export function withClickSound(fn: () => void) {
	return () => {
		playSound('click');
		fn();
	};
}
