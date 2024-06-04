import { LanguageClientConfig } from 'monaco-editor-wrapper';
import { useWorkerFactory } from 'monaco-editor-wrapper/workerFactory';

export const configureMonacoWorkers = () => {
    // override the worker factory with your own direct definition
    useWorkerFactory({
        ignoreMapping: true,
        workerLoaders: {
            editorWorkerService: () => new Worker(new URL('monaco-editor/esm/vs/editor/editor.worker.js', import.meta.url), { type: 'module' })
        }
    });
};

export const configureWorker = (): LanguageClientConfig => {
    // vite does not extract the worker properly if it is URL is a variable
    const lsWorker = new Worker(new URL('./language/main-browser', import.meta.url), {
        type: 'module',
        name: 'HelloWorld Language Server'
    });
    

    return {
        languageId: 'hello-world-id',
        options: {
            $type: 'WorkerDirect',
            worker: lsWorker
        },
        // connectionProvider: {
        //     get: async () => ({ reader, writer }),
        // }
    }
};
