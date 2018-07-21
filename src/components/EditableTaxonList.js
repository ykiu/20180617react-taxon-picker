import React, { Component } from 'react';

import {List, Set, Map} from 'immutable';
import ListComponent from '@material-ui/core/List';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


function TaxonCheckbox (props) {
  return props.display?
         props.children:
         null;
}

class EditableTaxonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openNodeIDs: Set()
    };
  }

  handleItemClick(nodeID) {
    this.props.toggleItemExpansion(nodeID);
    this.props.onItemSelect(nodeID);
  }

  handleItemCheck(nodeID) {
    this.props.onItemCheck(nodeID);
  }

  render() {
    /**@type {Map<Map, Map>} */
    const childNodesByParentIDs = this.props.childTaxaByParentIDs;
    /**@type {Map<Map, Map>} */
    const commonNamesByTaxonIDs = this.props.commonNamesByTaxonIDs;
    /**@type {Map<Map, Map>} */
    const scientificNamesByTaxonIDs = this.props.scientificNamesByTaxonIDs;

    /**@type {Array<Map>} */
    let nodeStack = childNodesByParentIDs.get(null, List()).toArray();
    const components = [];

    while (nodeStack.length) {
      const currentNode = nodeStack.pop();
      const currentNodeID = currentNode.get('id')

      if (this.props.expandedItemIDs.has(currentNodeID)) {
        const childNodes = childNodesByParentIDs.get(currentNodeID, List());
        Array.prototype.push.apply(nodeStack, childNodes.toArray());
      }

      components.push(
        <ListItem button onClick={() => this.handleItemClick(currentNodeID)} key={currentNodeID}>
          <TaxonCheckbox display={this.props.onItemCheck !== undefined}>
            <Checkbox 
              onClick={e => e.stopPropagation()}
              onChange={() => this.handleItemCheck(currentNodeID)}
              disableRipple={true}
              checked={this.props.checkedItemIDs.has(currentNodeID)}
            />
          </TaxonCheckbox>
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

EditableTaxonList.defaultProps = {
  checkedItemIDs: Set()
}

export default EditableTaxonList;
