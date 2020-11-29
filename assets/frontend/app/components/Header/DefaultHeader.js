import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Logo from './assets/logo.svg'
import Notify from  './assets/notify.svg'
import Mail from  './assets/mail.svg'
import User from  './assets/user.svg'
import Search from  './assets/search.svg'
import Avatar from './assets/avatar.jpg'
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles(theme => ({
	header: {
		//position: 'fixed',
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		//height: 128,
		padding: '32px 48px 0 32px',
		justifyContent: 'space-between',
		boxSizing: 'border-box',
		[theme.breakpoints.down('xs')]: {
			padding: '16px',
		},

	},
	border: {
		border: '0.5px solid #73737355',
		//width: 57,
		height: 57,
	},
	centerVert: {
		display: 'flex',
		alignItems: 'center',
	},
	avatar: {
		height: 64,
		width: 64,
		borderRadius: '50%'
	},
	rightButtons: {
		marginLeft: 'auto',
		'& > *': {
			marginLeft: theme.spacing(4)
		}
	},
	docs: {
		marginLeft: 164,
		fontWeight: 600
	},
	search: {
		borderRadius: '20px',
		background: '#EFEFEF',
		margin: '0 16px',
		boxShadow: 'unset',
		padding: '0 8px',
		display: 'flex',
		alignItems: 'center',
		width: '75%'
	}
}))

const Header = ({ }) => {

	const classes = useStyles()

	return (
		<header className={classes.header}>
			<Hidden xsDown>
				<div className={classes.centerVert}>
					<Logo/>
					<Typography className={classes.docs}>Документация</Typography>
				</div>
				<div className={clsx(classes.rightButtons, classes.centerVert)}>

					<IconButton>
						<Notify/>
					</IconButton>
					<IconButton>
						<Mail/>
					</IconButton>
					<div className={classes.border}></div>

					<Typography>nikolai.coss@gmail.com</Typography>
					<img className={classes.avatar} src={Avatar}/>

				</div>
			</Hidden>

			<Hidden smUp>
				<div className={classes.centerVert} style={{width: '100%', justifyContent: 'space-between'}}>
					<User/>
					<Paper component="form" className={classes.search}>
						<IconButton aria-label="search">
							<Search/>
						</IconButton>
						<InputBase
							className={classes.input}
							placeholder="Поиск проектов"
							inputProps={{ 'aria-label': 'Поиск проектов' }}
						/>


					</Paper>
					<Notify/>
				</div>

			</Hidden>

		</header>
	)
}


export default Header
