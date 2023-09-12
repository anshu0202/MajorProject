
import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                // background: 'rgb(2, 0, 36)',
                background: 'linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 88, 121, 1) 53%, rgba(0, 212, 255, 1) 100%)',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="white" gutterBottom>
                            About Us
                        </Typography>
                        <Typography variant="body2" color="white">
                            We are Education Wave , dedicated to providing the best service to our
                            customers.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="white" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body2" color="white">
                            Jalandhar Punjab
                        </Typography>
                        <Typography variant="body2" color="white">
                            Email: laxmikantsarswat.com
                        </Typography>
                        <Typography variant="body2" color="white">
                            Phone: +91 9511506049
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" color="white" gutterBottom>
                            Follow Us
                        </Typography>
                        <Link href="https://www.facebook.com/" color="inherit">
                            <Facebook />
                        </Link>
                        <Link
                            href="https://www.instagram.com/"
                            color="inherit"
                            sx={{ pl: 1, pr: 1 }}
                        >
                            <Instagram />
                        </Link>
                        <Link href="https://www.twitter.com/" color="inherit">
                            <Twitter  />
                        </Link>
                    </Grid>
                </Grid>
                <Box mt={5}>
                    <Typography variant="body2" color="white" align="center">
                        {"Copyright © "}
                        <Link color="inherit" href="https://your-website.com/">
                            Education Wave  
                        </Link>{" "}
                        {new Date().getFullYear()}
                        {"."}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}