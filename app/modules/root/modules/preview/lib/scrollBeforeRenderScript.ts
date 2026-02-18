export const scrollBeforeRenderScript = `
		const target = document.getElementById('scale-tab-content');

		if (target) {
			target.scrollTo({ top: target.scrollHeight });
		}
	`
