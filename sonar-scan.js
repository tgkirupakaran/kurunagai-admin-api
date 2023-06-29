const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl : 'https://sonar.viyanulagu.com/',
    token : "2c3be3cf48ff33d22812461c2d399062139e1529",
    options: {
      'sonar.projectName': 'Kurunagi Admin API',
      'sonar.projectDescription': 'Description for Kurunagi Admin API',
      'sonar.sources': '.',
      'sonar.tests': 'test'
    }
  },
  () => process.exit()
)