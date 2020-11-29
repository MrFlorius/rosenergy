import React, {FC, ReactElement} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Theme } from '@material-ui/core';

const useGlobalStyles = makeStyles((theme : Theme) => ({
	'@global': {
		html: {
			width: '100%',
			height: '100%',
			padding: 0,
			margin: 0,
		},
		body: {
			// background: (theme.palette.type === 'light')
			// 	? theme.palette.types.light.background.default
			// 	: theme.palette.types.dark.background.default,
			background: '#F6F8F9',
			color: '#000000',
			width: '100%',
			height: '100%',
			padding: 0,
			margin: 0,
		},
		'#app': {
			width: '100%',
			height: '100%',
			display: 'flex',
			flexDirection: 'column'
		},
	}
}))

interface DependentWrapperProps {
	children: ReactElement
}

const DependentWrapper : FC<DependentWrapperProps> = ({ children }) => {
	// Apply global styles
	useGlobalStyles()

	return React.Children.only(children)
}

export default DependentWrapper
