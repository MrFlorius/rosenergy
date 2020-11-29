const chalk = require('chalk')
const ip = require('ip')

const divider = chalk.gray('-----------------------------------')

const packageJson = require('../package.json')

const APP_LOGO =
	' __      __                   _ _         \n' +
	' \\ \\    / /                  | (_)      \n' +
	'  \\ \\  / /_ _ _ __   __ _  __| |_ ___   \n' +
	'   \\ \\/ / _` | \'_ \\ / _` |/ _` | / __| \n' +
	'    \\  / (_| | | | | (_| | (_| | \\__ \\ \n' +
	'     \\/ \\__,_|_| |_|\\__,_|\\__,_|_|___/\n' +
	`                      Dashboard v${packageJson.version}\n`

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {

	// Called whenever there's an error on the server we want to print
	error: err => {
		console.error(chalk.red(err))
	},

	// Called when express.js app starts on given port w/o errors
	appStarted: (port, host, tunnelStarted) => {
		console.log(APP_LOGO)

		console.log(`Server started ! ${chalk.green('✓')}`)

		// If the tunnel started, log that and the URL it's available at
		if (tunnelStarted) {
			console.log(`Tunnel initialised ${chalk.green('✓')}`)
		}

		console.log(` ${chalk.bold('Access URLs:')}`)
		console.log(divider)
		console.log(`Localhost: ${chalk.magenta(`http://${host}:${port}`)}`)
		console.log(`      LAN: ${chalk.magenta(`http://${ip.address()}:${port}`)}`)

		if (tunnelStarted) {
			console.log(`    Proxy: ${chalk.magenta(tunnelStarted)}`)
		}
		console.log(divider)

		console.log(`${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}\n`)
	},
}

module.exports = logger
