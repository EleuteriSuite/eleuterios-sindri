export function formatDelta(delta) {
  return `${JSON.stringify(delta.ops, null, 2)}`;
}

export function getParentCodeBlock(
  htmlString: string,
  index: number
): { el: Node; doc: Document } | null {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // Recorremos el DOM para localizar el nodo que contiene el índice
  let foundNode: Node | null = null;

  function walk(node: Node, start: number): number {
    if (foundNode) return start;

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? "";
      const end = start + text.length;

      if (index >= start && index < end) {
        foundNode = node;
      }
      return end;
    }

    // Para nodos de elemento, procesamos hijos
    for (const child of Array.from(node.childNodes)) {
      start = walk(child, start);
      if (foundNode) break;
    }

    return start;
  }

  walk(doc.body, 0);
  if (!foundNode) return null;

  // Subir hasta encontrar un <code>
  let el: Node | null = foundNode;
  while (el && el.nodeName.toLowerCase() !== "code") {
    el = el.parentNode;
  }

  if (!el || el.nodeName.toLowerCase() !== "code") {
    return null;
  }

  return { el, doc };
  // Serializar el nodo <code> completo
  //return (el as HTMLElement).outerHTML;
}
