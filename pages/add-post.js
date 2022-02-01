import { Button } from "@mui/material";
import { useState } from "react";
import Nav from "../components/nav";
import styles from '../styles/Home.module.css'
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    buttonAdd: {
        backgroundColor: '#05acff',
        fontSize: "12px",
        color: 'white',
        '&:hover': {
            backgroundColor: "#007dcb",
         },
        
    }
  });

export default function AddPost() {
    const classes = useStyles()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handlePost = async (e) => {
        e.preventDefault();

        // reset error and message
        setError('');
        setMessage('');

        // fields check
        if (!firstName || !lastName || !email || !phone || !address) return setError('All fields are required');

        // post structure
        let post = {
            firstName,
            lastName,
            email,
            phone,
            address,
            published: false,
            // createdAt: new Date().toISOString(),
        };
        // save the post
        let response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(post),
        });

        // get the data
        let data = await response.json();

        if (data.success) {
            // reset the fields
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhone('');
            setAddress('');
            // set the message
            return setMessage(data.message);
        } else {
            // set the error
            return setError(data.message);
        }
    };

    return (
        <div>
            <Nav />
            <div className={styles.container}>
                <form onSubmit={handlePost} className={styles.form}>
                    {error ? (
                        <div className={styles.formItem}>
                            <h3 className={styles.error}>{error}</h3>
                        </div>
                    ) : null}
                    {message ? (
                        <div className={styles.formItem}>
                            <h3 className={styles.message}>{message}</h3>
                        </div>
                    ) : null}
                    <div className={styles.formItem}>
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            placeholder="First Name"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            placeholder="Last Name"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="Email"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            placeholder="Phone"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <label>Address</label>
                        <textarea
                            name="address"
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                            placeholder="Address"
                        />
                    </div>
                    
                    <div className={styles.formItem}>
                        <Button className={classes.buttonAdd} type="submit">Add post</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}