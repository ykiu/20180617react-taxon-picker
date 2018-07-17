import React, { Component } from 'react';

import WithIndex from '../containers/WithIndex';
import TaxonSelectionContainer from '../containers/TaxonSelectionContainer';
import TaxonListFilteredBySearchText from '../containers/TaxonListFilteredBySearchText';

class App extends Component {
  render() {
    return (
      <WithIndex indexCreators={[
        'personalCommonNamesByNames',
        'personalScientificNamesByNames',
        'personalCommonNamesByTaxonIDs',
        'personalScientificNamesByTaxonIDs',
        'referentialCommonNamesByTaxonIDs',
        'referentialScientificNamesByTaxonIDs',
      ]}>
        {props => (
          <TaxonListFilteredBySearchText taxonType='referential' {...props}>
            {props => (
              <TaxonSelectionContainer
                {...props}
                referentialChildTaxaByParentIDs={props.childTaxaByParentIDs}
              />
            )}
          </TaxonListFilteredBySearchText>
        )}
      </WithIndex>
    );
  }
}

export default App;
