import * as React from 'karet';
import * as U from 'karet.util';
import ButtonGrid from '../button-grid';
import Button from '../button';

const gridCols = 4;

const ToolGrid = () =>
  <div>
    <ButtonGrid cols={gridCols}>
      <Button>
        <i className="material-icons">create</i>
      </Button>
      <Button>
        <i className="material-icons">clear</i>
      </Button>
    </ButtonGrid>

    <ButtonGrid cols={gridCols}>
      <Button disabled>
        <i className="material-icons">undo</i>
      </Button>
      <Button disabled>
        <i className="material-icons">redo</i>
      </Button>
      <Button>
        <i className="material-icons">save_alt</i>
      </Button>
    </ButtonGrid>
  </div>;

export default ToolGrid;
