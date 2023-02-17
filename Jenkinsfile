// Constants
ciNode = ""
final CONST_SONAR_PROJECT_ID = "eslint-config-measured"
final CONST_SONAR_PROJECT_NAME = "Eslint Config Measured"
node {
    ciNode = env.CI_NODE ?: "master"
}

// Pipeline
node(ciNode) {
    timestamps {
        try {
            stage("prep") {
                checkout scm
            }

            stage("validate") {
                env.NODE_ENV = "test"

                sh (
                        script: "echo \"_auth=${env.NEXUS_AUTH_TOKEN}\" >> ./.npmrc"
                )

                nodejs('RegularNodeLTS') {
                    try {
                        sh 'node -v'
                        sh 'npm install && npm prune'
                        sh 'npm run build:full'
//                        sh 'npm run full-prod'
                    } catch (err) {
                        if (currentBuild.result == 'UNSTABLE') {
                            currentBuild.result = 'FAILURE'
                        }

                        throw err
                    }
                }
            }

            stage("dependency-scan") {
                try {
                    sh "${DEPENDENCY_CHECK_COMMAND} ."
                }
                catch (err) {
                    if (currentBuild.result == 'UNSTABLE') {
                        currentBuild.result = 'FAILURE'
                    }
                    notifyBitbucket('FAILED')
                    throw err
                }
            }


            stage("sonar") {
                PROJECT_VERSION= sh (
                        script: "cat package.json | grep version | head -1 | awk -F: '{ print \$2 }'| sed 's/[\",]//g' | tr -d '[[:space:]]'",
                        returnStdout: true
                )

                def scannerHome = tool 'SonarQubeScannerDefault'

                withSonarQubeEnv("DefaultSonarQube") {
                    nodejs('RegularNodeLTS') {
                        sh "${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=${CONST_SONAR_PROJECT_ID} \
                            -Dsonar.projectName='${CONST_SONAR_PROJECT_NAME}' \
                            -Dsonar.projectVersion=${PROJECT_VERSION} \
                            -Dsonar.branch.name=${env.BRANCH_NAME} \
                            -Dsonar.sources='.' \
                            -Dsonar.cpd.exclusions='test/**,e2e/**,src/client/entities/**,src/master/entities/**,odc-reports/**' \
                            -Dsonar.coverage.exclusions='test/**,index.ts,rules/eslint-rules.ts,rules/prettier-rules.ts,rules/typescript-rules.ts,rules/rules.ts,e2e/**,gulpfile.js,karma.coverage.js,karma.unit.js,webpack.config.js,odc-reports/**' \
                            -Dsonar.exclusions='**/node_modules/**,coverage/**,coverage_it/**,e2e/transpiled/**,nlconfig/**,dist/**,.githooks/**,distsrc/**,lib/**,**/UnmappedScenarioPlannerDimensions**,**/VCrossChannelStable**,**/LogDbCleanroomProcessExecutionLog**,odc-reports/**' \
                            -Dsonar.javascript.lcov.reportPaths='coverage/lcov.info' \
                            -Dsonar.sourceEncoding='UTF-8' \
                            -Dsonar.qualitygate.wait=true \
                            -Dsonar.login=${env.SONAR_CI_CREDS}"
                    }
                }
            }

            stage("quality-gate") {
                timeout(time: 5, unit: 'MINUTES') {
                    def qg = waitForQualityGate()
                    echo "waiting for quality gate status.."
                    if (qg.status != 'OK') {
                        echo "Pipeline aborted due to quality gate failure: ${qg.status}"
                        error "Pipeline aborted due to quality gate failure: ${qg.status}"
                    } else {
                        echo "Quality gate passed: ${qg.status}"
                    }
                }
            }

             stage("export artifact") {
            	sh "rm -rf node_modules coverage .scannerwork"
                archiveArtifacts '**/*'
            }

            stage ("Starting cd job") {
            	if(env.BRANCH_NAME == 'master'){
                	build job: 'cd-' + CONST_SONAR_PROJECT_ID, propagate: false, wait: false
                }
            }

            notifyBuildStatus("SUCCESS")
        } catch (e) {
            currentBuild.result = 'FAILURE'
            notifyBuildStatus("FAILED")
            throw e
        }
    }
}

def notifyBuildStatus(String buildStatus) {
    def recipients = 'cc:engteam@measured.com'

    emailext body: '$PROJECT_NAME - Build # $BUILD_NUMBER - ' + buildStatus + ':<br/><br/>Build log available at: $BUILD_URL<br/><br/>',
            mimeType: 'text/html',
            recipientProviders: [[$class: 'CulpritsRecipientProvider'], [$class: 'RequesterRecipientProvider'], [$class: 'DevelopersRecipientProvider']],
            replyTo: '$DEFAULT_REPLYTO',
            subject: buildStatus + ': $PROJECT_NAME - Build # $BUILD_NUMBER!',
            to: recipients
}
