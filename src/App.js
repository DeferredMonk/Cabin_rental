import { List, DialogTitle, Container, Typography, Select, MenuItem, FormControl, InputLabel, Slider, Stack, Button, Dialog } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox } from '@material-ui/core';
import { useState, useEffect } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  vali: {
    marginTop: "50px",
    marginBot: "30px"
  },
  ylamargin: {
    marginTop: "50px"
  }
})

function App() {

  const tyyli = useStyles();
  const [open, setOpen] = useState(false);
  const [kokonimi, setKokonimi] = useState("")
  const [pvm, setPvm] = useState("")
  const [vuokra, setVuokra] = useState(0)
  const [vrk, setVrk] = useState(1)
  const [siivous, setSiivous] = useState(false)
  const [varattavissa, setVarattavissa] = useState(true)
  const marks = [
    {
      value: 1,
      label: '1 Vrk',
    },
    {
      value: 14,
      label: '14 Vrk',
    },
  ];

  const [yhteensa, setYhteensa] = useState(0);
  useEffect(() => {
    if (siivous) {
      setYhteensa(vuokra * vrk + 100)
    } else {
      setYhteensa(vuokra * vrk)
    }
  }, [vrk, vuokra, siivous]);
  useEffect(() => {
    if (kokonimi && pvm && vuokra) {
      setVarattavissa(false)
    } else {
      setVarattavissa(true)
    }
  }, [kokonimi, pvm, vuokra]);

  return (
    <Container maxWidth="sm">
      <Typography align="center"
        variant="h4">
        Mökinvaraus lomake
      </Typography>
      <FormControl margin="normal"
        fullWidth="true"
        style={{
          marginTop: "50px"
        }}>
        <InputLabel id="valitsemokki">Valitse mökki</InputLabel>
        <Select
          labelId='valitsemokki'
          label="Valitse mökki"
          onChange={(e) => setVuokra(e.target.value)}>
          <MenuItem value={450}>Kuusenoksa (100m2, 450€/vrk)</MenuItem>
          <MenuItem value={600}>Siitinhiki (50m2, 600€/vrk)</MenuItem>
          <MenuItem value={749}>Villa Pöksy (180m2, 749€/vrk)</MenuItem>
          <MenuItem value={200}>Ryysyranta (50m2, 200€/vrk)</MenuItem>
        </Select>
        <Slider
          className={tyyli.vali}
          marks={marks}
          id="test"
          defaultValue={1}
          min={1}
          max={14}
          valueLabelDisplay="on"
          color="secondary"
          onChange={(e) => setVrk(e.target.value)} />
        <FormControlLabel control={
          <Checkbox onChange={(e) => setSiivous(e.target.checked)} />}
          label="Loppusiivouspalvelu (100€)" />
        <Typography
          align="center"
          variant='h5'
          style={{
            marginTop: "30px",
            fontWeight: "bold"
          }}>
          Yht. {yhteensa}€
        </Typography>
        <Stack
          direction="row"
          style={{
            justifyContent: "space-around",
            marginTop: "50px"
          }}>
          <TextField placeholder='Koko nimi' onChange={(e) => setKokonimi(e.target.value)} />
          <TextField placeholder='Päivämäärä' type="date" onChange={(e) => setPvm(e.target.value)} />
        </Stack>
        <Button
          variant="contained"
          color="success"
          disabled={varattavissa}
          style={{
            marginTop: "50px",
          }}
          onClick={() => setOpen(true)}>Varaa mökki</Button>
      </FormControl>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        style={{
          textAlign: "center"
        }}>
        <DialogTitle variant="bold">
          Vahvistus
        </DialogTitle>
        <Stack
          direction="row"
          style={{ justifyContent: "space-evenly" }}>
          <Stack spacing={2}>
            <Typography variant='h6'>
              Koko nimi:
            </Typography>
            <Typography variant='h6'>
              Saapumispäivämäärä:
            </Typography>
            <Typography variant='h6'>
              Yhteensä:
            </Typography>
          </Stack>
          <Stack spacing={2}>
            <Typography variant='h6'>
              {kokonimi}
            </Typography>
            <Typography variant='h6'>
              {pvm}
            </Typography>
            <Typography variant='h6'
              style={{ marginBottom: "20px" }}>
              {yhteensa}€
            </Typography>
          </Stack>
        </Stack>
      </Dialog>
    </Container >
  );
}

export default App;
