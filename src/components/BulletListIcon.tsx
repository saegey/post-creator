import { Descendant, Transforms, Editor, Element as SlateElement } from 'slate';

import TooltipButton from './TooltipButton';

const isBlockActive = (editor, format, blockType = 'type') => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  );

  return !!match;
};

const BulletListIcon = ({ editor }) => {
  return (
    <TooltipButton
      onClick={() => {
        const isActive = isBlockActive(editor, 'bulleted-list', 'type');
        Transforms.unwrapNodes(editor, {
          match: (n: any) =>
            !Editor.isEditor(n) &&
            n.type === 'bulleted-list' &&
            SlateElement.isElement(n),

          split: true,
        });
        Transforms.setNodes<SlateElement>(editor, {
          type: isActive ? 'paragraph' : 'list-item',
        } as any);

        if (!isActive) {
          const block = { type: 'bulleted-list', children: [] };
          Transforms.wrapNodes(editor, block);
        }
      }}
      title={'Bullet List'}
      tooltipText='Bulleted List'
    >
      <svg width='100%' height='100%' viewBox='0 -3.5 29 29' version='1.1'>
        <g
          id='Page-1'
          stroke='none'
          strokeWidth='1'
          fill='none'
          fillRule='evenodd'
        >
          <g
            id='Icon-Set-Filled'
            transform='translate(-571.000000, -210.000000)'
            fill='var(--theme-ui-colors-text)'
          >
            <path
              d='M598,227 L582,227 C580.896,227 580,227.896 580,229 C580,230.104 580.896,231 582,231 L598,231 C599.104,231 600,230.104 600,229 C600,227.896 599.104,227 598,227 L598,227 Z M598,219 L582,219 C580.896,219 580,219.896 580,221 C580,222.104 580.896,223 582,223 L598,223 C599.104,223 600,222.104 600,221 C600,219.896 599.104,219 598,219 L598,219 Z M582,215 L598,215 C599.104,215 600,214.104 600,213 C600,211.896 599.104,211 598,211 L582,211 C580.896,211 580,211.896 580,213 C580,214.104 580.896,215 582,215 L582,215 Z M574,226 C572.343,226 571,227.343 571,229 C571,230.657 572.343,232 574,232 C575.657,232 577,230.657 577,229 C577,227.343 575.657,226 574,226 L574,226 Z M574,218 C572.343,218 571,219.343 571,221 C571,222.657 572.343,224 574,224 C575.657,224 577,222.657 577,221 C577,219.343 575.657,218 574,218 L574,218 Z M574,210 C572.343,210 571,211.343 571,213 C571,214.657 572.343,216 574,216 C575.657,216 577,214.657 577,213 C577,211.343 575.657,210 574,210 L574,210 Z'
              id='bullet-list'
            ></path>
          </g>
        </g>
      </svg>
    </TooltipButton>
  );
};

export default BulletListIcon;
