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
            childTaxaByParentIDs={this.props.childTaxaByParentIDs}
            commonNamesByTaxonIDs={this.props.commonNamesByTaxonIDs}
            scientificNamesByTaxonIDs={this.props.scientificNamesByTaxonIDs}
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
