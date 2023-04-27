pipeline {
    environment {
        REGISTRY = "${env.REGISTRY_DOMAIN}/forsage-busd-frontend"
        BACKEND_DOMAIN = "${env.ROOT_DOMAIN}"
        PROD_BACKEND_DOMAIN = "busd.forsage.io"
        SHORT_GIT_COMMIT = sh(
        script: "printf \$(git rev-parse --short ${GIT_COMMIT})",
        returnStdout: true
        )
    }
    parameters {
        choice(name: 'STAND', choices: ['prod', 'stage', 'dev'], description: 'Pick stand')
    }

    agent {
        kubernetes {
            defaultContainer 'jnlp'
            yamlFile 'build.yaml'
        }
    }
    stages {

        stage('Docker Build Prod') {
            when {
                allOf {
                    expression {
                        params.STAND == 'prod'
                    }
                    expression {
                        BRANCH_NAME == 'prod'
                    }
                }
            }
            steps {
                container('kaniko') {
                    script {
                        sh "/kaniko/executor --dockerfile `pwd`/Dockerfile --context `pwd` --destination=${REGISTRY}:${SHORT_GIT_COMMIT} --snapshotMode=redo --cache=true --cache-ttl=999h"
                    }
                }
            }
        }

        stage('Docker Build Stage') {
            when {
                allOf {
                    expression {
                        params.STAND == 'stage'
                    }
                }
            }
            steps {
                container('kaniko') {
                    script {
                        sh "/kaniko/executor --dockerfile `pwd`/Dockerfile --context `pwd` --destination=${REGISTRY}:${SHORT_GIT_COMMIT} --snapshotMode=redo --cache=true --cache-ttl=999h"
                    }
                }
            }
        }

        stage('Docker Build Dev') {
            when {
                allOf {
                    expression {
                        params.STAND == 'dev'
                    }
                }
            }
            steps {
                container('kaniko') {
                    script {
                        sh "/kaniko/executor --dockerfile `pwd`/Dockerfile --context `pwd` --destination=${REGISTRY}:${SHORT_GIT_COMMIT} --snapshotMode=redo --cache=true --cache-ttl=999h"
                    }
                }

            }
        }

        stage('Helm Deploy to Prod') {
            when {
                allOf {
                    expression {
                        params.STAND == 'prod'
                    }
                    expression {
                        BRANCH_NAME == 'prod'
                    }
                }
            }
            steps {
               container('helm') {
                    //sh "helm delete forsage-busd-frontend -n forsage-${params.STAND}"
                    sh "helm upgrade --install --atomic forsage-busd-frontend ./helm/forsage-busd-frontend -n forsage-${params.STAND}  --wait --set image.tag=${SHORT_GIT_COMMIT} --set image.repository=${REGISTRY} -f ./helm/forsage-busd-frontend/values-prod.yaml"
                    sh "helm upgrade --install istio-stands ./helm/istio-stands-prod -n forsage-${params.STAND} --set STAND_NAME=${params.STAND} --set HOST_NAME_PROD=${PROD_BACKEND_DOMAIN}"
                }
            }
        }

        stage('Helm Deploy to Stage') {
            when {
                allOf {
                    expression {
                        params.STAND == 'stage'
                    }
                }
            }
            steps {
               container('helm') {
                    //sh "helm delete forsage-busd-frontend -n forsage-${params.STAND}"
                    sh "helm upgrade --install --atomic forsage-busd-frontend ./helm/forsage-busd-frontend -n forsage-${params.STAND} --wait --set image.tag=${SHORT_GIT_COMMIT} --set image.repository=${REGISTRY} -f ./helm/forsage-busd-frontend/values-stage.yaml"
                    sh "helm upgrade --install nginx-auth-busd-front ./helm/nginx-auth-busd-front -n forsage-${params.STAND} --wait -f ./helm/nginx-auth-busd-front/values-${params.STAND}.yaml"
                    sh "helm upgrade --install istio-stands ./helm/istio-stands -n forsage-${params.STAND} --set STAND_NAME=${params.STAND} --set HOST_NAME=${params.STAND}.${BACKEND_DOMAIN}"
                }
            }
        }

        stage('Helm Deploy to Develop Stand') {
            when {
                allOf {
                    expression {
                        params.STAND == 'dev'
                    }
                }
            }
            steps {
               container('helm') {
                    //sh "helm delete forsage-busd-frontend -n forsage-${params.STAND}"
                    sh "helm upgrade --install --atomic forsage-busd-frontend ./helm/forsage-busd-frontend -n forsage-${params.STAND} --wait --set image.tag=${SHORT_GIT_COMMIT} --set image.repository=${REGISTRY} -f ./helm/forsage-busd-frontend/values-dev.yaml"
                    sh "helm upgrade --install nginx-auth-busd-front ./helm/nginx-auth-busd-front -n forsage-${params.STAND} --wait -f ./helm/nginx-auth-busd-front/values-${params.STAND}.yaml"
                    sh "helm upgrade --install istio-stands ./helm/istio-stands -n forsage-${params.STAND} --set STAND_NAME=${params.STAND} --set HOST_NAME=${params.STAND}.${BACKEND_DOMAIN}"
                }
            }
        }
    }
}
