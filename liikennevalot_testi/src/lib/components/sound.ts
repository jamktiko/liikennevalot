// sound.ts
const sounds: Record<string, HTMLAudioElement> = {};

const pools: Record<string, HTMLAudioElement[]> = {};

const POOL_SIZE = 5;

export function registerSound(name: string, src: string) {
	if (pools[name]) return;

	pools[name] = Array.from({ length: POOL_SIZE }, () => {
		const audio = new Audio(src);
		audio.preload = 'auto';
		return audio;
	});
}
export function playSound(name: string) {
	const pool = pools[name];
	if (!pool) return;

	// etsi vapaa audio
	const audio = pool.find((a) => a.paused || a.ended) ?? pool[0];

	audio.currentTime = 0;

	audio.play().catch(() => {});
}

export function stopSound(name: string) {
	const audio = sounds[name];
	if (!audio) return;

	audio.pause();
	audio.currentTime = 0;
}

export function warmSound(name: string) {
	const pool = pools[name];
	if (!pool) return;

	pool.forEach((audio) => {
		audio.volume = 0;
		audio.play().then(() => {
			audio.pause();
			audio.currentTime = 0;
			audio.volume = 1;
		});
	});
}
