import {Set} from 'immutable'

import React, { Component } from 'react';

import Drawer from '@material-ui/core/Drawer';

import TaxonDrawerContainer from '../containers/TaxonDrawerContainer';
import TaxonSearch from './TaxonSearch';
import TaxonListAndImportPrompt from './TaxonListAndImportPrompt'
import EditableTaxonList from './EditableTaxonList'

const VIEW_TYPES = {
  SELECT_VIEW: 'SELECT_VIEW',
  IMPORT_VIEW: 'IMPORT_VIEW',
}

function SelectView(props) {
  return (
    props.viewType === VIEW_TYPES.SELECT_VIEW?
    props.children: null
  )
}

function ImportView(props) {
  return (
    props.viewType === VIEW_TYPES.IMPORT_VIEW?
    props.children: null
  )
}

class TaxonSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTaxonDrawerOpen: false,
      selectedTaxonID: null,
      viewType: VIEW_TYPES.SELECT_VIEW,
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
      isTaxonDrawerOpen: false,
    })
    this.props.changeSearchText(event.target.value);
  }

  handleImportButtonClick() {
    this.setState({
      viewType: VIEW_TYPES.IMPORT_VIEW
    })
    this.props.selectRelevantReferentialTaxa();
  }

  render() {
    return (
      <div>
        <TaxonSearch onSearchFieldChange={this.handleSearchFieldChange.bind(this)} />
        <SelectView viewType={this.state.viewType}>
          <TaxonListAndImportPrompt
            searchText={this.props.searchText}
            childTaxaByParentIDs={this.props.personalChildTaxaByParentIDs}
            commonNamesByTaxonIDs={this.props.personalCommonNamesByTaxonIDs}
            scientificNamesByTaxonIDs={this.props.personalScientificNamesByTaxonIDs}
            onItemSelect={this.handleItemSelect.bind(this)}
            onImportButtonClick={this.handleImportButtonClick.bind(this)}
            expandedItemIDs={this.props.expandedPersonalTaxonIDs}
            toggleItemExpansion={this.props.togglePersonalTaxonExpansion}
          />
        </SelectView>
        <ImportView viewType={this.state.viewType}>
          <EditableTaxonList
            onItemSelect={this.handleItemSelect.bind(this)}
            onItemCheck={this.props.toggleReferentialTaxonSelection}
            childTaxaByParentIDs={this.props.referentialChildTaxaByParentIDs}
            commonNamesByTaxonIDs={this.props.referentialCommonNamesByTaxonIDs}
            scientificNamesByTaxonIDs={this.props.referentialScientificNamesByTaxonIDs}
            checkedItemIDs={this.props.selectedReferentialTaxonIDs}
            expandedItemIDs={this.props.expandedReferentialTaxonIDs}
            toggleItemExpansion={this.props.toggleReferentialTaxonExpansion}
          />
        </ImportView>
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
