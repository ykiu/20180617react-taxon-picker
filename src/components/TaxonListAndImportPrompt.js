import React, { Component } from 'react';
import EditableTaxonList from './EditableTaxonList';
import ImportPrompt from './ImportPrompt';

class TaxonListAndImportPrompt extends Component {
  render() {
    return (
      <div>{
        this.props.childTaxaByParentIDs.count()?
        (
          <EditableTaxonList
            onItemSelect={this.props.onItemSelect}
            onItemCheck={this.props.onItemCheck}
            childTaxaByParentIDs={this.props.childTaxaByParentIDs}
            commonNamesByTaxonIDs={this.props.commonNamesByTaxonIDs}
            scientificNamesByTaxonIDs={this.props.scientificNamesByTaxonIDs}
            expandedItemIDs={this.props.expandedItemIDs}
            toggleItemExpansion={this.props.toggleItemExpansion}
            checkedItemIDs={this.props.checkedItemIDs}
            selectionType={this.props.selectionType}
          />
        ):
        (
          <ImportPrompt 
            searchText={this.props.searchText}
            onImportButtonClick={this.props.onImportButtonClick}
          />
        )

      }</div>
    )
  }
}

export default TaxonListAndImportPrompt;
