import React, {FC} from 'react'
import Typography from "@material-ui/core/Typography/Typography";

// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({

// }));

interface NotFoundPageType {}

const NotFoundPage : FC<NotFoundPageType> = ({}) => {

	// const classes = useStyles();

	return (
		<div>
			<Typography>404. No Page found</Typography>


		</div>
	)
}



export default NotFoundPage