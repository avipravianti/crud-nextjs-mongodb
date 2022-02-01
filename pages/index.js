import Head from 'next/head'
import Nav from '../components/nav';
import styles from '../styles/Home.module.css'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from '@mui/material/TablePagination';
import { Button, IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';


const useStyles = makeStyles({
  table: {
    minWidth: 750
  },
  buttonPublish: {
    color: '#2196f3'
  },
  buttonDelete: {
    color: "#ff1744"
  }
});

export default function Home({ posts }) {

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [publishing, setPublishing] = useState(false);
  // const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, posts.length - page * rowsPerPage);

  //publish post
  const publishPost = async (postId) => {

    setPublishing(true);

    try {
      // update post
      await fetch('/api/posts', {
        method: 'PUT',
        body: postId,
      });

      setPublishing(false);

      return router.push(router.asPath);
    } catch (error) {
      return setPublishing(false)
    }
  };

  const handleDelete = async (postId) => {



    try {
      // Delete post
      await fetch('/api/posts', {
        method: 'DELETE',
        body: postId,
      });



      return router.push(router.asPath);


    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <Nav />

      <main>
        <div className={styles.container}>
          {posts.length === 0 ? (
            <h2>No added posts</h2>
          ) : (
            <TableContainer >
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell >ID</TableCell>
                    <TableCell align="center">First Name</TableCell>
                    <TableCell align="center">Last Name</TableCell>
                    <TableCell align="center">email</TableCell>
                    <TableCell align="center">Phone</TableCell>
                    <TableCell align="center">Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {posts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((post, i) => (
                      <TableRow key={post._id}>
                        <TableCell component="th" scope="posts">
                          {post._id}
                        </TableCell>
                        <TableCell align="center">{post.firstName}</TableCell>
                        <TableCell align="center">{post.lastName}</TableCell>
                        <TableCell align="center">{post.email}</TableCell>
                        <TableCell align="center">{post.phone}</TableCell>
                        <TableCell align="center">{post.address}</TableCell>
                        <Stack direction="row" spacing={1} sx={{marginTop: '10px'}}>
                          {!post.published ? (
                            <IconButton className={classes.buttonPublish} onClick={() => publishPost(post._id)}>
                              <PublishIcon/>
                            </IconButton>
                          ) : null}
                          <IconButton className={classes.buttonDelete} aria-label="delete" onClick={() => handleDelete(post._id)} >
                            <DeleteIcon/>
                          </IconButton>
                        </Stack>
                      </TableRow>
                    ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10,]}
                component="div"
                count={posts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ marginTop: '10px' }}
              />
            </TableContainer>
          )}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  // get the current environment
  let dev = process.env.NODE_ENV !== 'production';
  let { DEV_URL, PROD_URL } = process.env;

  // request posts from api
  let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/posts`);
  // extract the data
  let data = await response.json();

  return {
    props: { posts: data['message'], },
  };
}
