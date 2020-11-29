import React from 'react'
import Loadable from 'react-loadable'
import Loading from '../../components/LoadableLoading'

const LoadableComponent = Loadable({
	loader: () => import('./HomePage'),
	loading: Loading,
})

export default () => <LoadableComponent/>