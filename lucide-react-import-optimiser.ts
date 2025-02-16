import { Plugin } from 'vite';
import MagicString from 'magic-string';

function lucideReactImportOptimizer(): Plugin {
    return {
        name: 'lucide-react-import-optimizer',
        transform(code: string, id: string) {
            const ms = new MagicString(code, { filename: id });

            ms.replace(
                /import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]lucide-react['"]/g,
                (match: string, imports: string) => {
                    const importStatements = imports
                        .split(',')
                        .map((imp: string) => {
                            const [name, alias] = imp.split(' as ').map((s: string) => s.trim());
                            const importName = alias || name;
                            const kebabCaseName = name
                                .replace(/([a-z])([A-Z])/g, '$1-$2')
                                .toLowerCase();
                            return `import ${importName} from 'lucide-react/dist/esm/icons/${kebabCaseName}';`;
                        })
                        .join('\n');
                    return importStatements;
                }
            );

            if (ms.hasChanged()) {
                return {
                    code: ms.toString(),
                    map: ms.generateMap(),
                };
            }
        },
    };
}

export default lucideReactImportOptimizer;
