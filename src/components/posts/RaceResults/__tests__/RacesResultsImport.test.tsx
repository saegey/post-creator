import { expect, jest, test } from "@jest/globals";
import RaceResultsImport from "../RaceResultsImport";
import renderer from 'react-test-renderer';
import {CustomEditor} from '../../../../types/common';
// import {shallow} from 'enzyme';

describe('race results import', () => {
  it('it should render)', () => {
    const editor = jest.fn() as unknown as CustomEditor;
    const component = renderer.create(<RaceResultsImport editor={editor}/>)
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
