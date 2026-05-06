function readPackage(pkg, context) {
  // Força a versão segura do pacote 'yaml' em qualquer dependência que o utilize
  if (pkg.dependencies && pkg.dependencies.yaml) {
    pkg.dependencies.yaml = '^2.8.4';
    context.log('Forçando yaml@^2.8.4 em ' + pkg.name);
  }
  
  if (pkg.devDependencies && pkg.devDependencies.yaml) {
    pkg.devDependencies.yaml = '^2.8.4';
    context.log('Forçando yaml@^2.8.4 em ' + pkg.name + ' (dev)');
  }

  return pkg;
}

module.exports = {
  hooks: {
    readPackage
  }
};
