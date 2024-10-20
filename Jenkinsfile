pipeline {
    agent any

    stages {
        stage('Build and Run Docker Image') {
            steps {
                script {
                    // Ejecutar el contenedor con Podman Compose
                    sh "podman-compose up -d"
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
