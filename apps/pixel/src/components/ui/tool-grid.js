import * as React from 'karet';
import * as U from 'karet.util';
import * as K from 'kefir';
import ButtonGrid from '../button-grid';
import Button from '../button';
import Icon from '../icon';
import { effect, createEff, Effect } from '../../effects';

const gridCols = 3;

const ToolGrid = ({ canvas, test = U.variable(), test2 = test.log('test 123') }) =>
  <div>
    <ButtonGrid cols={gridCols}>
      <Button>
        <Icon type="create" />
      </Button>
      <Button>
        <Icon type="clear" />
      </Button>
    </ButtonGrid>

    <ButtonGrid cols={gridCols}>
      <Button disabled>
        <Icon type="undo" />
      </Button>
      <Button disabled>
        <Icon type="redo" />
      </Button>
      <Button
       action={U.doSet(effect, U.liftRec(createEff(Effect.SAVE_IMAGE))(canvas))}>
        <Icon type="save_alt" />
      </Button>
      <Button>
        <Icon type="add_photo_alternate" />
      </Button>
      <Button>
        <Icon type="crop" />
      </Button>
    </ButtonGrid>
  </div>;

export default ToolGrid;
