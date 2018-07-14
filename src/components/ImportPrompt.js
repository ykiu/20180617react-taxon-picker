import React from 'react';
import Button from '@material-ui/core/Button';

export default function ImportPrompt(props) {return (
  <div>
    <p>{props.searchText}は存在しません。</p>
    <Button
      variant="contained"
      color="primary"
      onClick={props.onImportButtonClick}
    >
      外部から取り込む
    </Button>
  </div>
)}