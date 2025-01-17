const initialData = {
  layout: [
    {
      elementType: 'HTML',
      id: 'd1334a95-ssaasdsadsadasdsda',
      tagName: 'div',
      type: 'Element',
      children: [
        {
          elementType: 'TEXT',
          value: 'Hello',
          id: 'd1334a9sab670-9f88ba3d3cbbe',
          attributes: {
            styles: {
              color: 'blue',
              fontSize: '16px',
              fontWeight: 'bold',
            },
          },
        },
        {
          elementType: 'TEXT',
          value: 'World',
          id: 'sddsf-9f88ba3d3cbbe',
          attributes: {
            styles: {
              color: 'red',
              fontSize: '16px',
              fontWeight: 'bold',
            },
          },
        },
      ],
    },
  ],
  components: [
    {
      elementType: 'HTML',
      id: 'button',
      tagName: 'button',
      label: 'Button',
      attributes: {
        onClick: {
          type: 'CUSTOM',
          value: '()=>console.log("hi")',
        },
      },
      children: [],
    },
    {
      elementType: 'TEXT',
      label: 'Text',
      id: 'text',
      value: 'Hello World',
    },
    {
      elementType: 'HTML',
      id: 'input',
      tagName: 'input',
      label: 'Input',
      attributes: {},
      children: [],
    },
    {
      elementType: 'HTML',
      id: 'div',
      tagName: 'div',
      label: 'Container',
      attributes: {},
      children: [],
    },
    {
      elementType: 'HTML',
      id: 'span',
      tagName: 'span',
      label: 'Span',
      attributes: {},
      children: [],
    },
  ],
};

export default initialData;
