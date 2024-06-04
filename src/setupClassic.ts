import { MonacoEditorLanguageClientWrapper, UserConfig } from 'monaco-editor-wrapper';
import { configureWorker } from './setupCommon.js';
import monarchSyntax from "./syntaxes/hello-world.monarch.js";
import getConfigurationServiceOverride from '@codingame/monaco-vscode-configuration-service-override';
import getEditorServiceOverride from '@codingame/monaco-vscode-editor-service-override';
import getKeybindingsServiceOverride from '@codingame/monaco-vscode-keybindings-service-override';
import { useOpenEditorStub } from 'monaco-editor-wrapper/vscode/services';
// import { Uri } from 'vscode';

export const setupConfigClassic = (): UserConfig => {
    return {
        loggerConfig: {
            enabled: true,
            debugEnabled: true
        },
        wrapperConfig: {
            serviceConfig: {
                userServices: {
                    ...getConfigurationServiceOverride(),
                    ...getEditorServiceOverride(useOpenEditorStub),
                    ...getKeybindingsServiceOverride()
                },
                debugLogging: true,
                // workspaceConfig: {
                //     workspaceProvider: {
                //         trusted: true,
                //         workspace: {
                //             workspaceUri: Uri.file('/workspace')
                //         },
                //         async open() {
                //             return false;
                //         }
                //     }
                // }
            },
            editorAppConfig: {
                $type: 'classic',
                codeResources: {
                    main: {
                        text: `// Hello World is running in the web!`,
                        fileExt: 'hello',
                        enforceLanguageId: 'hello-world-id'
                    }
                },
                useDiffEditor: false,
                languageDef: {
                    monarchLanguage: monarchSyntax,
                    languageExtensionConfig: {
                        id: 'hello-world-id',
                        extensions: ['.hello']
                    }
                },
                editorOptions: {
                    'semanticHighlighting.enabled': true,
                    theme: 'vs-dark'
                }
            }
        },
        languageClientConfig: configureWorker()
    };
};

export const executeClassic = async (htmlElement: HTMLElement) => {
    const userConfig = setupConfigClassic();
    const wrapper = new MonacoEditorLanguageClientWrapper();
    await wrapper.initAndStart(userConfig, htmlElement);
};
