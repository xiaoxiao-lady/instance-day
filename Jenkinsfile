pipeline {
    agent any
    tools {
        nodejs 'node16'
    }
    
    environment {
        APP_NAME = "my-vue-app"
        DEPLOY_URL = "http://localhost:8000"
        CONTAINER_NAME = "nginx-vue-app"
        // M1芯片使用ARM兼容的镜像
        NGINX_IMAGE = "nginx:alpine"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '🔗 拉取代码...'
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo '📦 安装依赖...'
                sh '''
                  npm install -g cnpm --registry=https://registry.npmmirror.com
                  cnpm install
                '''
            }
        }
        
        stage('Build') {
            steps {
                echo '🏗️ 构建Vue项目...'
                sh 'npm run build'
                sh 'ls -la dist/'
            }
        }
        
        stage('Docker Deploy for M1') {
            steps {
                echo '🍎 M1芯片Docker部署...'
                sh """
                  # 停止旧容器
                  docker stop ${env.CONTAINER_NAME} 2>/dev/null || echo "清理旧容器"
                  docker rm ${env.CONTAINER_NAME} 2>/dev/null || echo "容器已清理"
                  
                  # 为M1芯片拉取合适的镜像
                  echo "拉取Nginx镜像..."
                  docker pull ${env.NGINX_IMAGE}
                  
                  # 启动容器（M1兼容）
                  docker run -d \\
                    --name ${env.CONTAINER_NAME} \\
                    -p 8000:80 \\
                    -v \$(pwd)/dist:/usr/share/nginx/html \\
                    ${env.NGINX_IMAGE}
                  
                  echo "✅ M1 Docker部署完成"
                """
            }
        }
        
        stage('Health Check') {
            steps {
                echo '🔍 检查部署状态...'
                sh """
                  sleep 3
                  
                  # 检查容器架构
                  echo "=== 容器信息 ==="
                  docker exec ${env.CONTAINER_NAME} uname -m
                  
                  # 健康检查
                  if curl -f ${env.DEPLOY_URL} > /dev/null 2>&1; then
                    echo "✅ M1部署成功!"
                  else
                    echo "❌ 部署失败，检查日志..."
                    docker logs ${env.CONTAINER_NAME}
                    exit 1
                  fi
                """
            }
        }
        
        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
            }
        }
    }
    
    post {
        success {
            echo "🎉 ${env.APP_NAME} 在M1 Mac上部署成功!"
            echo "🔗 访问: ${env.DEPLOY_URL}"
            echo "🍎 架构: Apple M1"
        }
    }
}
