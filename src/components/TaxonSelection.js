import React, { Component } from 'react';

import Drawer from '@material-ui/core/Drawer';

import TaxonDrawerContainer from '../containers/TaxonDrawerContainer';
import TaxonListFilteredBySearchText from '../containers/TaxonListFilteredBySearchText';
import TaxonSearch from './TaxonSearch';


class TaxonSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTaxonDrawerOpen: false,
      searchText: '',
      selectedTaxonID: null
    };
  }

  handleItemSelect(taxonID) {
    this.setState({
      selectedTaxonID: taxonID,
      isTaxonDrawerOpen: true,
    });
  }

  handleTaxonDrawerClose() {
    this.setState({
      isTaxonDrawerOpen: false,
    });
  }

  handleSearchFieldChange(event) {
    this.setState({
      searchText: event.target.value,
      isTaxonDrawerOpen: false,
    })
  }

  render() {
    return (
      <div>
        <TaxonSearch onSearchFieldChange={this.handleSearchFieldChange.bind(this)} />
        <TaxonListFilteredBySearchText
          searchText={this.state.searchText}
          onItemSelect={this.handleItemSelect.bind(this)}
        />
        <Drawer
          open={this.state.isTaxonDrawerOpen}
          onClose={this.handleTaxonDrawerClose.bind(this)}
          anchor='bottom'
          variant='persistent'
        >
          <TaxonDrawerContainer
            selectedTaxonID={this.state.selectedTaxonID}
          />
        </Drawer>
      </div>
    )
  }
}

export default TaxonSelection;
