pipeline {
    agent any

    environment {
        // Define variables de entorno si es necesario
        NODE_VERSION = '20.14.0' // Cambia esto según la versión de Node.js que necesites
    }

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    // Instalar dependencias
                    sh "nvm install ${NODE_VERSION}" // Instalar la versión de Node.js
                    sh "npm install" // Instalar dependencias de npm
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Construir la aplicación Next.js
                    sh "npm run build"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Construir la imagen de Docker
                    sh "podman compose up -d"
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