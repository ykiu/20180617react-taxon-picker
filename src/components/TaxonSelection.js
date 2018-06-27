import React, { Component } from 'react';

import Drawer from '@material-ui/core/Drawer';

import EditableTaxonList from './EditableTaxonList';
import TaxonDrawer from './TaxonDrawer';
import TaxonSearch from './TaxonSearch';

class TaxonSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemID: null,
      isTaxonDrawerOpen: false,
      searchText: '',
    };
  }

  handleItemSelect(node) {
    this.setState({
      selectedNode: node,
      isTaxonDrawerOpen: true,
    });
  }

  handleTaxonDrawerOpen() {}

  handleTaxonDrawerClose() {
    this.setState({
      isTaxonDrawerOpen: false,
    });
  }

  handleSearchFieldChange(event) {
    console.log(event.target.value)
    this.setState({
      searchText: event.target.value,
      selectedItemID: null,
      isTaxonDrawerOpen: false,
    })
  }


  render() {
    return (
      <div>
        <TaxonSearch onSearchFieldChange={this.handleSearchFieldChange.bind(this)} />
        <EditableTaxonList
          taxa={this.props.taxa}
          onItemSelect={this.handleItemSelect.bind(this)}
        />
        <Drawer
          open={this.state.isTaxonDrawerOpen}
          onClose={this.handleTaxonDrawerClose.bind(this)}
          onOpen={this.handleTaxonDrawerOpen.bind(this)}
          anchor='bottom'
          variant='persistent'
        >
          <TaxonDrawer
            tabIndex={0}
            role="button"
          >
            {
              this.state.selectedNode === undefined?
              null:
              this.state.selectedNode.get('common_name')
            }
          </TaxonDrawer>
        </Drawer>
      </div>
    )
  }
}

export default TaxonSelection;
