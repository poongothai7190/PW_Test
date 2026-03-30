pipeline {
    agent any

    environment {
        CI = 'true'  // ensures Playwright runs in headless/CI mode
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/poongothai7190/PW_Test.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                // Run Playwright tests in headless mode and generate HTML report
                bat 'npx playwright test --reporter=html'
            }
        }

        stage('Publish HTML Report') {
            steps {
                publishHTML(target: [
                    reportName: 'Playwright HTML Report',
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    keepAll: true,
                    allowMissing: false,
                    alwaysLinkToLastBuild: true
                ])
            }
        }
    }

    post {
        always {
            // Archive the report artifacts so you can download them from Jenkins
            archiveArtifacts artifacts: 'playwright-report/**/*.*', allowEmptyArchive: true
        }
    }
}