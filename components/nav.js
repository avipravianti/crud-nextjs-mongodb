import Link from 'next/link'
import styles from '../styles/nav.module.css'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    buttonNavAdd: {
        backgroundColor: '#00ca4e',
        fontSize: "12px",
        color: 'white',
        '&:hover': {
            backgroundColor: "#00ca00",
         },
    }
  });

export default function Nav() {
    const classes = useStyles()
    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="/add-post">
                    <Button className={classes.buttonNavAdd} sx={{marginRight: "50px"}} variant="outlined" startIcon={<AddCircleIcon />}>
                        Add Post
                    </Button>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}