import React, {FC, ReactElement} from 'react'

import theme from '../../theme'
import { ThemeProvider } from '@material-ui/styles'
import DependentWrapper from './DependentWrapper'
import { useThemeType } from './reducers/selector'

interface ChangeableThemeProps {
	children: ReactElement
}

const ChangeableThemeProvider : FC<ChangeableThemeProps> = ({ children }) => {

	const themeType = useThemeType()

	return (
		<ThemeProvider
			theme={theme(themeType)}
		>
			<DependentWrapper>
				{React.Children.only(children)}
			</DependentWrapper>
		</ThemeProvider>
	)
}


export default ChangeableThemeProvider