import React, {FC} from 'react'
import { Helmet } from 'react-helmet'
import { Switch, Route } from 'react-router-dom'
import HomePage from '../HomePage'
import NotFoundPage from '../NotFoundPage'
import Header from '../../components/Header'
import Menu from '../../components/Menu'
import {makeStyles} from "@material-ui/core/styles";
import CreateProject from "../CreateProject/";
import MyProjects from "../MyProjects/";
import ViewProject from "../ViewProject/";
import Complete from "../CreateProject/Complete";
interface AppProps {}

const useStyles = makeStyles(theme => ({
	wrapper: {
		display: 'flex',
		flexDirection: 'row'
	},
	content: {
		background: '#fafafa',
		borderRadius: 10,
		boxShadow: '0px 0px 35px rgba(0, 0, 0, 0.05)',
		width: '100%',
		margin: '48px 48px 48px 0',
		height: '100%',
		[theme.breakpoints.down('sm')]: {
			background: 'transparent',
			boxShadow: 'unset',
			margin: 0,
		},
	}
}))

const App : FC<AppProps> = ({}) => {

	const classes = useStyles()

	return (


		<React.Fragment>
			<Helmet
				titleTemplate="%s - Россети Dashboard"
				defaultTitle="Россети Dashboard"
			>
				<meta name="description" content="Россети Dashboard"/>
			</Helmet>

			<Header/>
			<div className={classes.wrapper}>
				<Menu/>
				<div className={classes.content}>
					<Switch>
						<Route exact path="/" component={HomePage}/>
						<Route exact path="/projects/" component={HomePage}/>
						<Route exact path="/project/:id" component={ViewProject}/>
						<Route exact path="/project/complete/:id" component={Complete}/>
						<Route exact path="/myprojects/" component={MyProjects}/>
						<Route exact path="/projects/create" component={CreateProject}/>
						<Route path="" component={NotFoundPage}/>
					</Switch>
				</div>
			</div>


		</React.Fragment>
	)
}

export default App
