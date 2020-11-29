import { createMuiTheme } from '@material-ui/core/styles'

export default type => createMuiTheme({
	palette: {
		// types: {
		// 	dark: {
		// 		background: {
		// 			default: '#121212'
		// 		}
		// 	},
		// 	light: {
		// 		background: {
		// 			default: '#ffffff'
		// 		}
		// 	}
		// },
		type: type,
	}
})