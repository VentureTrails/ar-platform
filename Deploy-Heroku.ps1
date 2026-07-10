$token = 'HRKU-AAHy0dmvjJlvKMRDLtaG5294mBhN8iTHShJtE4I6_Mhw_____wJ471f6DlAz'
$appName = 'ar-platform-api'

$headers = @{
    'Authorization' = "Bearer $token"
    'Accept' = 'application/vnd.heroku+json; version=3'
    'Content-Type' = 'application/json'
}

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Heroku Backend Deployment" -ForegroundColor Cyan
Write-Host "======================================`n" -ForegroundColor Cyan

try {
    Write-Host "[1/3] Creating Heroku app: $appName" -ForegroundColor Yellow
    $createBody = @{
        name = $appName
        region = "us"
    } | ConvertTo-Json
    
    $createResponse = Invoke-RestMethod -Uri 'https://api.heroku.com/apps' -Method POST -Headers $headers -Body $createBody -UseBasicParsing
    Write-Host "✓ App created: $($createResponse.name)" -ForegroundColor Green
    Write-Host "  URL: $($createResponse.web_url)`n" -ForegroundColor Green
}
catch {
    Write-Host "App might already exist, continuing..." -ForegroundColor Yellow
}

try {
    Write-Host "[2/3] Setting environment variables..." -ForegroundColor Yellow
    $configBody = @{
        MONGODB_URI = "mongodb+srv://snapcart:250Kaleb!123@cluster0.bdbiuhi.mongodb.net/ar-platform"
        CLOUDINARY_NAME = "jcfhvno0"
        CLOUDINARY_API_KEY = "756249944483745"
        CLOUDINARY_API_SECRET = "6CD3NS4zBHKGaKKctHDkDVVFcGw"
        JWT_SECRET = "ar-platform-secret-key-2026"
        NODE_ENV = "production"
    } | ConvertTo-Json
    
    $configResponse = Invoke-RestMethod -Uri "https://api.heroku.com/apps/$appName/config-vars" -Method PATCH -Headers $headers -Body $configBody -UseBasicParsing
    Write-Host "✓ Environment variables set" -ForegroundColor Green
    Write-Host "  - MONGODB_URI" -ForegroundColor Green
    Write-Host "  - CLOUDINARY credentials" -ForegroundColor Green
    Write-Host "  - JWT_SECRET" -ForegroundColor Green
    Write-Host "  - NODE_ENV=production`n" -ForegroundColor Green
}
catch {
    Write-Host "Error setting config: $($_.Exception.Message)" -ForegroundColor Red
}

try {
    Write-Host "[3/3] Setting buildpack..." -ForegroundColor Yellow
    $buildpackBody = @{
        buildpack = "heroku/nodejs"
    } | ConvertTo-Json
    
    $buildpackResponse = Invoke-RestMethod -Uri "https://api.heroku.com/apps/$appName/buildpack-installations" -Method POST -Headers $headers -Body $buildpackBody -UseBasicParsing
    Write-Host "✓ Buildpack configured (Node.js)" -ForegroundColor Green
}
catch {
    Write-Host "Buildpack might already be set, continuing..." -ForegroundColor Yellow
}

Write-Host "`n======================================" -ForegroundColor Cyan
Write-Host "Heroku App Ready for Deployment!" -ForegroundColor Cyan
Write-Host "======================================`n" -ForegroundColor Cyan

Write-Host "Next, deploy your code by running:" -ForegroundColor White
Write-Host ""
Write-Host 'cd "c:\Users\yulic\Downloads\files\builder app"' -ForegroundColor Yellow
Write-Host "git remote add heroku https://git.heroku.com/$appName.git" -ForegroundColor Yellow
Write-Host "git push heroku main" -ForegroundColor Yellow
Write-Host ""
Write-Host "Your API will be live at:" -ForegroundColor White
Write-Host "https://$appName.herokuapp.com" -ForegroundColor Cyan
Write-Host ""
