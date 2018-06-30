import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core';

import createIndex from '../indexCreator';


const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function TaxonDrawer(props) {
  const { classes } = props;
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="title" color="inherit" className={classes.flex}>
          {(() => {
            if (props.selectedTaxonID === null) {
              return null;
            }
            const commonNamesByTaxonIDs = createIndex(props.commonNames, 'taxon');
            return commonNamesByTaxonIDs.getIn([props.selectedTaxonID, 0, 'name']);
          })()}
        </Typography>
        <Button color="inherit">選択</Button>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(TaxonDrawer);
