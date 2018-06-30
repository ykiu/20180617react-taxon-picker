import React, { Component } from 'react';

import Drawer from '@material-ui/core/Drawer';

import EditableTaxonList from './EditableTaxonList';
import TaxonDrawer from './TaxonDrawer';
import TaxonSearch from './TaxonSearch';

import createIndex from '../indexCreator';

class TaxonSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTaxonDrawerOpen: false,
      searchText: '',
    };
  }

  handleItemSelect(nodeID) {
    this.setState({
      selectedNodeID: nodeID,
      isTaxonDrawerOpen: true,
    });
  }

  handleTaxonDrawerClose() {
    this.setState({
      isTaxonDrawerOpen: false,
    });
  }

  handleSearchFieldChange(event) {
    console.log(event.target.value)
    this.setState({
      searchText: event.target.value,
      isTaxonDrawerOpen: false,
    })
  }


  render() {
    const commonNamesByTaxonID = createIndex(this.props.commonNames, 'taxon');
    return (
      <div>
        <TaxonSearch onSearchFieldChange={this.handleSearchFieldChange.bind(this)} />
        <EditableTaxonList
          taxa={this.props.taxa}
          commonNames={this.props.commonNames}
          scientificNames={this.props.scientificNames}
          onItemSelect={this.handleItemSelect.bind(this)}
        />
        <Drawer
          open={this.state.isTaxonDrawerOpen}
          onClose={this.handleTaxonDrawerClose.bind(this)}
          anchor='bottom'
          variant='persistent'
        >
          <TaxonDrawer
            tabIndex={0}
            role="button"
          >
            {
              this.state.selectedNodeID === undefined?
              null:
              commonNamesByTaxonID.getIn([this.state.selectedNodeID, 0, 'name'])
            }
          </TaxonDrawer>
        </Drawer>
      </div>
    )
  }
}

export default TaxonSelection;
