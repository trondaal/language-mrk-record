'use babel';

import LanguageMrkRecord from '../lib/language-mrk-record';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('LanguageMrkRecord', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('language-mrk-record');
  });

  describe('when the language-mrk-record:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.language-mrk-record')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'language-mrk-record:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.language-mrk-record')).toExist();

        let languageMrkRecordElement = workspaceElement.querySelector('.language-mrk-record');
        expect(languageMrkRecordElement).toExist();

        let languageMrkRecordPanel = atom.workspace.panelForItem(languageMrkRecordElement);
        expect(languageMrkRecordPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'language-mrk-record:toggle');
        expect(languageMrkRecordPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.language-mrk-record')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'language-mrk-record:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let languageMrkRecordElement = workspaceElement.querySelector('.language-mrk-record');
        expect(languageMrkRecordElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'language-mrk-record:toggle');
        expect(languageMrkRecordElement).not.toBeVisible();
      });
    });
  });
});
