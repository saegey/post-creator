import { remark } from "remark";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import { Heading, HeadingData, Literal, Node } from "mdast";

const addID = (node: Heading, nodes: Record<string, number>) => {
  const id = node.children.map((c) => (c as unknown as Literal).value).join("");

  nodes[id] = (nodes[id] || 0) + 1;
  node.data = node.data || {
    hProperties: {
      id: `${id}${nodes[id] > 1 ? ` ${nodes[id] - 1}` : ""}`
        .replace(/[^a-zA-Z\d\s-]/g, "")
        .split(" ")
        .join("-")
        .toLowerCase(),
    },
  };
};

export const headingTree = () => {
  return (node: Node, file: any) => {
    file.data.headings = getHeadings(node);
  };
};

const getHeadings = (root: Node) => {
  const nodes = {};
  const output: Array<TransformType> = [];
  const indexMap: Record<string, TransformType> = {};

  visit(root, "heading", (node) => {
    addID(node, nodes);
    transformNode(node, output, indexMap);
  });

  return output;
};

export interface TransformType {
  value: string;
  depth: 1 | 2 | 3 | 4 | 5 | 6;
  data: HeadingData | undefined;
  children: Array<TransformType>;
}

const transformNode = (
  node: Heading,
  output: Array<TransformType>,
  indexMap: Record<string, TransformType>
) => {
  const transformedNode = {
    value: toString(node),
    depth: node.depth,
    data: node.data,
    children: [],
  };

  if (node.depth === 2) {
    output.push(transformedNode);
    indexMap[node.depth] = transformedNode;
  } else {
    const parent = indexMap[node.depth - 1];
    if (parent) {
      parent.children.push(transformedNode);
      indexMap[node.depth] = transformedNode;
    }
  }
};

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(headingTree).process(markdown);

  return { result: result.toString(), toc: result.data.headings };
}
