module.exports = {
	ci: {
		assert: {
			assertions: {
				'bf-cache': 'off',
				'forced-reflow-insight': 'warn',
				'network-dependency-tree-insight': 'off',
				'unused-javascript': 'off',
			},
			preset: 'lighthouse:recommended',
		},
		collect: {
			autodiscoverUrlBlocklist: ['./200.html', './404.html', './ru/index.html'],
			settings: {
				preset: 'desktop',
			},
			staticDistDir: './dist',
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
}
