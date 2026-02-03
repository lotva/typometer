import { createPage, setup } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

describe('IndexPage', async () => {
	await setup({
		host: 'http://localhost:3000/',
	})

	it('displays the sample component', async () => {
		const page = await createPage('/')
		expect(await page.getByText('Sample Component').isVisible()).toBeTruthy()
	})
})
