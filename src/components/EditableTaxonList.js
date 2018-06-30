import React, { Component } from 'react';

import {List, Set, Map} from 'immutable';
import ListComponent from '@material-ui/core/List';
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


import createIndex from '../indexCreator';

class EditableTaxonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openNodeIDs: Set()
    };
  }

  toggleNode(nodeID) {
    const childNodesByParentIDs = createIndex(this.props.taxa, 'parent');
    const openNodeIDs = this.state.openNodeIDs;
    if (this.state.openNodeIDs.has(nodeID)) {
      const childNodeIDs = childNodesByParentIDs
        .get(nodeID, List())
        .map(node => node.get('id'));
      this.setState({openNodeIDs: openNodeIDs.filterNot(
        x => (x === nodeID) || childNodeIDs.includes(x)
      )});
    } else {
      this.setState({openNodeIDs: openNodeIDs.add(nodeID)});
    }
  }

  handleItemClick(nodeID) {
    this.toggleNode(nodeID);
    this.props.onItemSelect(nodeID);
  }

  render() {
    const taxaByIDs = this.props.taxa;
    const commonNamesByIDs = this.props.commonNames;
    const scientificNamesByIDs = this.props.scientificNames;
    /**@type {Map<Map, Map>} */
    const childNodesByParentIDs = createIndex(taxaByIDs, 'parent');
    /**@type {Map<Map, Map>} */
    const commonNamesByTaxonIDs = createIndex(commonNamesByIDs, 'taxon');
    /**@type {Map<Map, Map>} */
    const scientificNamesByTaxonIDs = createIndex(scientificNamesByIDs, 'taxon');

    /**@type {Array<Map>} */
    let nodeStack = childNodesByParentIDs.get(null).toArray();
    const components = [];

    while (nodeStack.length) {
      const currentNode = nodeStack.pop();
      const currentNodeID = currentNode.get('id')

      if (this.state.openNodeIDs.has(currentNodeID)) {
        const childNodes = childNodesByParentIDs.get(currentNodeID, List());
        Array.prototype.push.apply(nodeStack, childNodes.toArray());
      }

      components.push(
        <ListItem button onClick={() => this.handleItemClick(currentNodeID)} key={currentNodeID}>
          <ListItemText
            primary={commonNamesByTaxonIDs.getIn([currentNodeID, 0, 'name'])}
            secondary={scientificNamesByTaxonIDs.getIn([currentNodeID, 0, 'name'])}
          />
          {
            childNodesByParentIDs.has(currentNodeID)?
            (this.state.openNodeIDs.has(currentNodeID) ? <ExpandLess /> : <ExpandMore />):
            null
          }
        </ListItem>
      )
      
    }
  
    return (
      <ListComponent component='nav'>
        {components}
      </ListComponent>
    );

  }
}

export default EditableTaxonList;
