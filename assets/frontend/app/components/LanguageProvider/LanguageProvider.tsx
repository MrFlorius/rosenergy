import React, {FC, ReactElement} from 'react'

import { IntlProvider } from 'react-intl'
import { useLocale } from './reducers/selector'

interface LanguageProps {
	messages?: object,
	children: ReactElement,
}

const LanguageProvider : FC<LanguageProps> = ({ messages, children }) => {

	const locale = useLocale()

	return (
		<IntlProvider
			key={locale}
			locale={locale}
			messages={messages[locale]}
		>
			{React.Children.only(children)}
		</IntlProvider>
	)
}


export default LanguageProvider