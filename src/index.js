import * as monaco from 'monaco-editor';
import html from './html';

const editor = monaco.editor.create(document.getElementById("container"), {
  value: html,
  language: "html",
});

editor.languages.registerCompletionItemProvider('html', {
  triggerCharacters: ['>'],
  provideCompletionItems: (model, position) => {
    console.log('>>> provideCompletionItems', model, position);
    const codePre = model.getValueInRange({
      startLineNumber: position.lineNumber,
      startColumn: 1,
      endLineNumber: position.lineNumber,
      endColumn: position.column,
    });

    const tag = codePre.match(/.*<(\w+)>$/)?.[1];

    if (!tag) {
      return;
    }

    const word = model.getWordUntilPosition(position);

    return {
      suggestions: [
        {
          label: `</${tag}>`,
          kind: monaco.languages.CompletionItemKind.EnumMember,
          insertText: `</${tag}>`,
          range: {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          },
        },
      ],
    };
  },
});

