pipeline {
    agent any

    stages {
        stage('Build and Run Docker Image') {
            steps {
                script {
                    sh "docker-compose up -d"
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
