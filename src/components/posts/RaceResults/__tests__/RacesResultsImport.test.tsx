import { expect, jest, test } from "@jest/globals";

// const { expect, test, jest } = require("jest");
import RaceResultsImport from "../RaceResultsImport";
import renderer from "react-test-renderer";
import { CustomEditor } from "../../../../types/common";

describe("race results import", () => {
  test("it should render)", () => {
    const editor = jest.fn() as unknown as CustomEditor;
    const component = renderer.create(<RaceResultsImport editor={editor} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
