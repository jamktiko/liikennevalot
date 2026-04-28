export class PelaajaLuokka {
	nimi = $state('');
	positionX = $state(0);
	vari = $state('');
	voitot = $state(0);
	input = $state('');

	constructor(nimi: string, vari: string, input: string) {
		this.nimi = nimi;
		this.vari = vari;
		this.input = input;
	}

	liiku(maara: number) {
		this.positionX += maara;
	}
}
