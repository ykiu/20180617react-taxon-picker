import React, { Component } from 'react';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import NestedList from './NestedList';
import { withStyles } from '@material-ui/core';



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

function DrawerBar(props) {
  const { classes } = props;
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="title" color="inherit" className={classes.flex}>
          {props.children}
        </Typography>
        <Button color="inherit">選択</Button>
      </Toolbar>
    </AppBar>
  );
}

const StyledDrawerBar = withStyles(styles)(DrawerBar);



class SelectableNestedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemID: null,
      isDrawerOpen: false,
    };
  }

  handleItemSelect(node) {
    this.setState({
      selectedNode: node,
      isDrawerOpen: true,
    });
  }

  handleDrawerOpen() {}

  handleDrawerClose() {
    this.setState({
      isDrawerOpen: false,
    });
  }

  render() {
    return (
      <div>
        <NestedList
          taxa={this.props.taxa}
          onItemSelect={this.handleItemSelect.bind(this)}
        />
        <SwipeableDrawer
          open={this.state.isDrawerOpen}
          onClose={this.handleDrawerClose.bind(this)}
          onOpen={this.handleDrawerOpen.bind(this)}
          anchor='bottom'
          variant='persistent'
        >
          <div
            tabIndex={0}
            role="button"
          >
            <StyledDrawerBar>
              {
                this.state.selectedNode === undefined?
                null:
                this.state.selectedNode.get('common_name')
              }
            </StyledDrawerBar>
          </div>
        </SwipeableDrawer>
      </div>
    )
  }
}

export default SelectableNestedList;