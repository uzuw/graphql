import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import Spinner from "../components/Spinner";
import {
  Container,
  Typography,
  Box,
  Button,
  Chip,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "success";
    case "In progress":
      return "warning";
    case "Not Started":
    default:
      return "error";
  }
};

const Projects = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <Spinner />;
  if (error) return <Typography color="error">Something went wrong</Typography>;

  const { name, description, status, client } = data.project;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        component={Link}
        to="/"
        sx={{
          mb: 3,
          "&:hover": {
            backgroundColor: "primary.light",
            color: "white",
          },
        }}
      >
        Back
      </Button>

      <Paper elevation={3} sx={{ p: 4,}}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {name}
        </Typography>

        <Typography variant="body1" sx={{ mb: 2,
            fontFamily: 'var(--font-dm)',
            color: 'gray',
         }}>
          {description}
        </Typography>

        <Chip
          label={status}
          color={getStatusColor(status)}
          sx={{
            mb: 3,
            fontWeight: "bold",
            textTransform: "capitalize",
            "&:hover": {
              opacity: 0.8,
            },
          }}
        />

        <Box mt={4}>
          <Typography variant="h5" gutterBottom sx={{
            color: 'red',
            fontWeight: 'bold',
            }}> 
            Client Info
          </Typography>
          <Typography>Name: {client.name}</Typography>
          <Typography>Email: {client.email}</Typography>
          <Typography>Phone: {client.phone}</Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Projects;
