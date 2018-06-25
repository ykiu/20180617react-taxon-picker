import React, { Component } from 'react';

import {List, Set, Map} from 'immutable';
import ListComponent from '@material-ui/core/List';
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


import createIndex from '../indexCreator';

class NestedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openNodes: Set()
    };
  }

  toggleNode(node) {
    const childNodesByParentIDs = createIndex(this.props.taxa, 'parent');
    const openNodes = this.state.openNodes;
    if (this.state.openNodes.has(node)) {
      const childNodes = childNodesByParentIDs.get(node.get('id'), List());
      this.setState({openNodes: openNodes.filterNot(
        x => (x === node) || childNodes.includes(x)
      )});
    } else {
      this.setState({openNodes: openNodes.add(node)});
    }
  }

  handleItemClick(node) {
    this.toggleNode(node);
    this.props.onItemSelect(node);
  }

  render() {
    const taxaByIDs = this.props.taxa;
    /**@type {Map<Map, Map>} */
    const childNodesByParentIDs = createIndex(taxaByIDs, 'parent');

    /**@type {Array<Map>} */
    let nodeStack = childNodesByParentIDs.get(null).toArray();
    const components = [];

    while (nodeStack.length) {
      const currentNode = nodeStack.pop();

      if (this.state.openNodes.has(currentNode)) {
        const childNodes = childNodesByParentIDs.get(currentNode.get('id'), List());
        Array.prototype.push.apply(nodeStack, childNodes.toArray());
      }

      components.push(
        <ListItem button onClick={() => this.handleItemClick(currentNode)}>
          <ListItemText
            primary={currentNode.get('common_name')}
            secondary={currentNode.get('scientific_name')}
          />
          {
            childNodesByParentIDs.has(currentNode.get('id'))?
            (this.state.openNodes.has(currentNode) ? <ExpandLess /> : <ExpandMore />):
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

export default NestedList;
