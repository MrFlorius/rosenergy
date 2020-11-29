import React, {FC, MouseEvent} from 'react'
import Button from '@material-ui/core/Button'
import { useDispatch } from 'react-redux'
import { useLocale, changeLocale } from '../LanguageProvider'

interface LocaleProps {
	className?: string
}

const LocaleToggle : FC<LocaleProps> = ({ className }) => {
	const dispatch = useDispatch()

	const locale = useLocale()

	return (
		<div className={className}>
			<Button
				onClick={(event: MouseEvent<HTMLButtonElement>) => {
					if (locale === 'ru') {
						dispatch(changeLocale('en'))
					} else {
						dispatch(changeLocale('ru'))
					}
				}}
			>
				Toggle Language!
			</Button>
		</div>
	)
}

export default LocaleToggle