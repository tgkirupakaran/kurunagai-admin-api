const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl : 'http://viyanulagu.com:9000',
    token : "2c3be3cf48ff33d22812461c2d399062139e1529",
    options: {
      'sonar.projectName': 'Kurunagi Admin API',
      'sonar.projectDescription': 'Description for Kurunagi Admin API',
      'sonar.sources': '.'
    }
  },
  () => process.exit()
)