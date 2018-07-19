import React, { Component } from 'react';

import WithIndex from '../containers/WithIndex';
import TaxonSelectionContainer from '../containers/TaxonSelectionContainer';
import makeCreateIndex from '../selectors/createIndex'

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
          <TaxonSelectionContainer
            {...props}
          />
        )}
      </WithIndex>
    );
  }
}

export default App;
