import React, {FC, MouseEvent} from 'react'
import Button from '@material-ui/core/Button'
import { useDispatch } from 'react-redux'
import { useThemeType, changeTheme, THEME_TYPES } from '../ChangeableThemeProvider'

interface ThemeProps {
	className?: string
}

const ThemeToggle : FC<ThemeProps> = ({ className }) => {
	const dispatch = useDispatch()
	const themeType = useThemeType()

	return (
		<div className={className}>
			<Button
				onClick={(event: MouseEvent<HTMLButtonElement>) => {
					if (themeType === THEME_TYPES.DARK) {
						dispatch(changeTheme(THEME_TYPES.LIGHT))
					} else {
						dispatch(changeTheme(THEME_TYPES.DARK))
					}
				}}
			>
				Toggle theme!
			</Button>
		</div>
	)
}

export default ThemeToggle