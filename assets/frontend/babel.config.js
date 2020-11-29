module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				modules: false,
			},
		],
		'@babel/typescript',
		'@babel/preset-react'
	],
	plugins: [
		'@babel/plugin-syntax-dynamic-import',
	],
	env: {
		production: {
			only: ['app'],
			plugins: [
				'lodash',
				'transform-react-remove-prop-types',
				'@babel/plugin-transform-react-inline-elements',
				'@babel/plugin-transform-react-constant-elements',
			],
		},
		test: {
			plugins: [
				'@babel/plugin-transform-modules-commonjs',
				'dynamic-import-node',
			],
		},
	},
}
