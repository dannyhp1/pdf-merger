import { useState } from 'react';
import * as Constants from '../config/constants';
import { Grid, Typography, AppBar, Tabs, Tab, Box } from '@material-ui/core';
import FileMerger from './FileMerger';
import FileSplitter from './FileSplitter';
import FileViewer from './FileViewer';

const navigationStyle = {
    justifyContent: 'center',
    justifyItems: 'center',
    alignItems: 'center'
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

function AppSelector(props) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Grid container>
            <Grid item xs={12} style={navigationStyle}>
            <AppBar position='static' color='secondary'>
            <Tabs value={value} onChange={handleChange} aria-label='simple tabs example'>
                <Tab label={Constants.applications.PDF_MERGER} {...a11yProps(0)} />
                <Tab label={Constants.applications.PDF_SPLITTER} {...a11yProps(1)} />
                <Tab label={Constants.applications.PDF_VIEWER} {...a11yProps(2)} />
            </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>
                <FileMerger />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <FileSplitter />
            </TabPanel>

            <TabPanel value={value} index={2}>
                <FileViewer />
            </TabPanel>
            </Grid>
        </Grid>
    )
}

export default AppSelector;
