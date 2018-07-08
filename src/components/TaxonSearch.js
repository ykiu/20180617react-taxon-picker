import React from 'react';
import Input from '@material-ui/core/Input';


export default function TaxonSearch(props) {
  return (
      <Input
        placeholder="分類群の名前を入力"
        inputProps={{
          'aria-label': 'Search',
        }}
        fullWidth={true}
        onChange={props.onSearchFieldChange}
      />
  );
}
