import * as Commonmark from 'commonmark';
import fs from 'fs';
import { LinkType } from './types';
import { FileLink } from './types';

// const goalFileLinks: FileLink[] = getFileLinks(LinkType.GOAL, '../goals');
// console.log(goalFileLinks);

function getFileLinks(linkType:LinkType, filePath:string) {
  const parser = new Commonmark.Parser();

  const goalFiles = fs.readdirSync(filePath);
  let fileLinks: FileLink[] = [];
  goalFiles.forEach(fileName => {
    if (fileName.endsWith('template.md')) return;
    const data = fs.readFileSync(`${filePath}/${fileName}`, 'utf-8');
    const parsed = parser.parse(data);
    const links = getLinks(parsed);
    const fileLink: FileLink = {
      type: linkType,
      file: fileName,
      links
    };
    fileLinks.push(fileLink);
  });
  return fileLinks;
}

// const questions = fs.readdirSync('../questions');
// const metrics = fs.readdirSync('../metrics');



// const data = fs.readFileSync('../goals/find-projects.md', 'utf-8');

// const parsed = parser.parse(data);




// const links = getLinks();
// console.log(links);


export function getLinks(parsed: Commonmark.Node) {
  const walker = parsed.walker();
  let event, node;
  let links = [];
  while ((event = walker.next())) {
    node = event.node;
    if (event.entering && node.type === 'link') {
      const link = {
        url: node.destination,
        text: node.firstChild?.literal
      }
      links.push(link);
    }
  }
  return links;
}


function getNodeShapeSyntax(node: { id?: string; shape: any; label: any; }) {
  switch (node.shape) {
    case 'rect':
      return `[${node.label}]`;
    case 'circ':
      return `((${node.label}))`;
    case 'roundrect':
      return `((${node.label}))`;
    case 'diamond':
      return `{${node.label}}`;
    default:
      return `[${node.label}]`;
  }
}

function getArrowTypeSyntax(edge: { from?: string; to?: string; type: any; }) {
  switch (edge.type) {
    case 'arrow':
      return '-->';
    case 'dashed':
      return '-.->';
    case 'thick':
      return '==>';
    default:
      return '-->';
  }
}


function generateMermaidDiagram() {
  const nodes = [
    { id: 'Goal1', shape: 'roundrect', label: 'Goal1' },
    { id: 'Question1', shape: 'diamond', label: 'Question2' },
    { id: 'Metric1', shape: 'circ', label: 'Metric1' },
    { id: 'Goal4', shape: 'roundrect', label: 'Goal4' },
  ];

  const edges = [
    { from: 'Goal1', to: 'Question1', type: 'arrow' },
    { from: 'Goal1', to: 'Metric1', type: 'arrow' },
    { from: 'Question1', to: 'Metric1', type: 'dashed' },
    { from: 'Metric1', to: 'Goal1', type: 'thick' },
  ];

  let mermaidSyntax = "```mermaid\ngraph LR\n";

  nodes.forEach(node => {
    const nodeSyntax = getNodeShapeSyntax(node);
    mermaidSyntax += `${node.id}${nodeSyntax}\n`;
  });

  edges.forEach(edge => {
    const arrowSyntax = getArrowTypeSyntax(edge);
    mermaidSyntax += `${edge.from}${arrowSyntax}${edge.to}\n`;
  });
  mermaidSyntax += '\n```';
  return mermaidSyntax;
}

console.log(generateMermaidDiagram())
