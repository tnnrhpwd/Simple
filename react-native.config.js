module.exports = {
  dependency: {
    platforms: {
      windows: {
        sourceDir: '../',
        solutionFile: 'Simple.sln',
        projects: [
          {
            projectFile: './Simple/Simple.vcxproj',
            directDependency: true,
          },
        ],
      },
    },
  },
  commands: [],
  assets: [],
  dependencies: {},
};
