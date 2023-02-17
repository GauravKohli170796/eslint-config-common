def allJob = env.JOB_NAME.tokenize('/') as String[];
def projectName = 'eslint-config-measured';

node {

	stage('import') {
		cleanWs()
		copyArtifacts filter: '**/*', fingerprintArtifacts: true, flatten: false, projectName: 'ci-'+ projectName + '/master'
	}

	stage('build'){
		sh 'echo "_auth=${NEXUS_AUTH_TOKEN}" >> ./.npmrc'
		sh 'npm prune'
		sh 'npm install'
		sh 'npm run build:full'
	}

	stage('update-lambda') {
		sh 'make package deploy'
	}

    stage('upload') {
        sh 'npm publish'
    }
}