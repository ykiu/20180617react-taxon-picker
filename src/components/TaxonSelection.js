import React, { Component } from 'react';

import {List} from 'immutable';

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
    this.setState({
      searchText: event.target.value,
      isTaxonDrawerOpen: false,
    })
  }

  filterTaxaBySearchText() {
    const commonNamesByNames = createIndex(this.props.commonNames, 'name');
    const matchedCommonNames = commonNamesByNames.get(this.state.searchText, List())
    if (matchedCommonNames.count() === 0) {
      return this.props.taxa;
    }
    /**@type {List} */
    const matchedTaxonIDs = matchedCommonNames.map(x => x.get('taxon'));

    const children = this.getChildren(matchedTaxonIDs);
    const parents = matchedTaxonIDs.map(x => this.props.taxa.getIn([x, 'parent'])).filterNot(x => x === null);
    const grandParents = this.getParents(parents);
    const taxa = children.concat(grandParents);
    return this.props.taxa.filter((value, key) => {
      return taxa.includes(value);
    });
  }

  /**
   * 
   * @param {List} taxonIDs 
   */
  getChildren(taxonIDs) {
    const childTaxaByParentIDs = createIndex(this.props.taxa, 'parent');
    const taxa = [];
    /**@type {Array} */
    const taxonIDStack = taxonIDs.toArray();
    while (taxonIDStack.length) {
      const currentTaxonID = taxonIDStack.pop();
      const currentTaxon = this.props.taxa.get(currentTaxonID);
      taxa.push(currentTaxon);
      /**@type {Array<Map>} */
      const childTaxa = childTaxaByParentIDs.get(currentTaxonID, List()).map(x => x.get('id')).toArray();
      Array.prototype.push.apply(taxonIDStack, childTaxa);
    }
    return taxa;
  }

  /**
   * 
   * @param {List} taxonIDs 
   */
  getParents(taxonIDs) {
    const taxa = [];
    /**@type {Array} */
    const taxonIDStack = taxonIDs.toArray();
    while (taxonIDStack.length) {
      const currentTaxonID = taxonIDStack.pop();
      const currentTaxon = this.props.taxa.get(currentTaxonID);
      taxa.push(currentTaxon);
      /**@type {Array<Map>} */
      const parentTaxonID = currentTaxon.get('parent')
      if (parentTaxonID !== null) {
        taxonIDStack.push(parentTaxonID);
      }
    }
    return taxa;
  }

  render() {
    const commonNamesByTaxonID = createIndex(this.props.commonNames, 'taxon');
    return (
      <div>
        <TaxonSearch onSearchFieldChange={this.handleSearchFieldChange.bind(this)} />
        <EditableTaxonList
          taxa={this.filterTaxaBySearchText()}
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
