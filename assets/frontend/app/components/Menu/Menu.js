import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography";

import Icon1 from './assets/1.svg'
import Icon2 from './assets/2.svg'
import Icon3 from './assets/3.svg'
import Icon4 from './assets/4.svg'
import Icon5 from './assets/5.svg'
import Icon1b from './assets/1b.svg'
import Icon2b from './assets/2b.svg'
import Icon3b from './assets/3b.svg'
import Icon4b from './assets/4b.svg'
import Icon5b from './assets/5b.svg'
import {Link} from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import {Hidden} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root: {
		marginTop: '64px',
		height: '100%',
		//flexBasis: '33%'
		width: 400,
		[theme.breakpoints.down('sm')]: {
			display: 'none'
		},
	},
	item: {
		cursor: 'pointer',
		display: 'flex',
		padding: '18px 18px 18px 42px',
		alignItems: 'center',
		'&:hover': {
			background: 'rgba(121, 180, 226, 0.1)'
		}
	},
	text: {
		fontWeight: '900',
		margin: '0 8px',
		fontSize: '18px'
	},
	bottomNav: {
		position: 'fixed',
		bottom: 0,
		width: '100%',
		zIndex: 9999
	}
}))


const Menu = ({  }) => {

	const classes = useStyles()


	return (
		<div>
			<div className={classes.root}>
				<div onClick={() => { window.open("http://" + location.host + "/projects/","_self") }} className={classes.item}><Icon1/><Typography className={classes.text}>Проекты</Typography></div>
				<div onClick={() => { window.open("http://" + location.host + "/myprojects/","_self") }} className={classes.item}><Icon2/><Typography className={classes.text}>Мои заявки</Typography></div>
				<div className={classes.item}><Icon3/><Typography className={classes.text}>Сезонные кубки</Typography></div>
				<div className={classes.item}><Icon4/><Typography className={classes.text}>Магазин мерча</Typography></div>
				<div className={classes.item}><Icon5/><Typography className={classes.text}>Комьюнити</Typography></div>
			</div>

			<Hidden smUp>
				<BottomNavigation className={classes.bottomNav}>
					<BottomNavigationAction onClick={() => { window.open("http://" + location.host + "/projects/","_self") }} label="Проекты" value="projects" icon={<Icon1b />} />
					<BottomNavigationAction onClick={() => { window.open("http://" + location.host + "/myprojects/","_self") }} label="Мои заявки" value="myproj" icon={<Icon2b />} />
					<BottomNavigationAction label="Сезонные кубки" value="season" icon={<Icon3b />} />
					<BottomNavigationAction label="Магазин мерча" value="merch" icon={<Icon4b />} />
					<BottomNavigationAction label="Комьюнити" value="community" icon={<Icon5b />} />
				</BottomNavigation>
			</Hidden>
		</div>

	)
}

export default Menu
